import collections
import json
import pylab
import matplotlib.pyplot as plt
import pandas as pd
import scipy.stats
import sklearn.linear_model
import numpy as np

# The data is opened and saved in 'data'.
filename = 'chemistrygame.json'
with open(filename) as f:
    data = json.load(f)

# This code converts the data to a dataframe called 'df_trials' with as columns userid, trialid and the trial_keys with the corresponding values in it.
trial_keys = ['moleculeName', 'score', 'time', 'helpText']
d = []
for userid, user in data['users'].items(): # items gives a list of (key, value) tuples from the dictionary.
    if 'questionnaire' in user:
        for trialid, trial in enumerate(user['trials']):
            values = [trial.get(key, '') for key in trial_keys] # trial.get(key) is hetzelfde als trial[key], maar trial.get(key,'') geeft '' als key niet bestaat
            d.append([userid, trialid] + values)
columns = ['userid', 'trialid'] + trial_keys
df_trials = pd.DataFrame(d, columns=columns)
df_trials.time /= 1000

# This code makes a new dataframe called 'df_users' with as columns the values in 'questions' and 'userid', 'version', 'trial_count', 'salary',
# 'mean_score' and 'mean time' with the corresponding values.
questions = ['age', 'exp', 'adapt', 'clear', 'easy', 'hint', 'learn', 'like', 'order']
d = []
for userid, user in data['users'].items():
    if 'questionnaire' in user:
        anwers = [int(user['questionnaire'][q]) for q in questions]
        version = 'random' if user['randomStrategy'] else 'adaptive'
        salary = user['totalScore']
        user_trials = df_trials[df_trials.userid == userid]
        mean_score = user_trials.score.mean()
        mean_time = user_trials.time.mean()
        trial_count = len(user_trials)
        d.append([userid, version, trial_count, salary, mean_score, mean_time] + anwers)
columns = ['userid', 'version', 'trial_count', 'salary', 'mean_score', 'mean_time'] + questions
df_users = pd.DataFrame(d, columns=columns)

# This code makes a frame for test results, this is convenient to see all the values of a t test at once.
TTestResult = collections.namedtuple('TTestResult', ['p','t','mean_rand','mean_adap','std_rand','std_adap'])

# This function carries out a t test on var on the group random vs adaptive.
def ttest(var):
    rand = df_users[df_users.version == 'random'][var]
    adap = df_users[df_users.version == 'adaptive'][var]
    t, p = scipy.stats.ttest_ind(rand, adap)
    return TTestResult(p, t, rand.mean(), adap.mean(), rand.std(), adap.std())

# This code calls the function ttest and print the result, different values could be passed to the function (f.e. adapt).
result = ttest('easy')
print("result of ttest was: ")
print(result)

# linear regression code
# The independent and the dependent variables should be changed manually to do a different linear regression (e.g. 'age' as indep_var and dep could be
# of 'mean_time'.
indep_var = 'exp'
indep = df_users[[indep_var,'version']].copy()
indep.version = indep.version == 'adaptive'
dep = df_users['mean_score']

# This code makes a linear regressor and fits the data on it and prints the intercept, the coefficients and determines the F and p values.
c = sklearn.linear_model.LinearRegression()
c.fit(indep, dep)
val = sklearn.feature_selection.f_regression(indep, dep)
print("After this line, the F and p value of the coefficients is given")
print(val)
print("After this line the intercept and the coefficents of the linear regression is given")
print(c.intercept_, c.coef_)

# This code is needed to make a plot of the linear regression in which the dimension version is split out.
x = range(int(indep[indep_var].max())) # a list of ints with as maximum value the maximum value of the independent variable (f.e. exp [1,2,3,4,5,6,7,8]).
y = [[c.predict([[i,v]])[0] for i in x] for v in [0,1]] # 0 is random, 1 is adaptive

fig = plt.figure()

# The labels should correspond to the independent and the dependent variable.
ax1 = fig.add_subplot(111)
ax1.set_xlabel('experience')
ax1.set_ylabel('average mean score')

ax1.plot(x,np.array(y[0]).T, label='random version') # make label for random and for adaptive
ax1.plot(x,np.array(y[1]).T, label='adaptive version')
ax1.scatter(indep[indep.version == False][indep_var], dep[indep.version == False], label='random mean score', marker='x')
ax1.scatter(indep[indep.version == True][indep_var], dep[indep.version == True], label='adaptive mean score', marker='x')

leg = ax1.legend()

plt.show()