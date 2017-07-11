import collections
import json
import pylab
import matplotlib.pyplot as plt
import pandas as pd
import scipy.stats
import sklearn.linear_model
import numpy as np

filename = 'chemistrygame.json'
with open(filename) as f:
    data = json.load(f)

trial_keys = ['moleculeName', 'score', 'time', 'helpText']
d = []
for userid, user in data['users'].items(): # items geeft een lijst met (key,value) tuples uit de dictionary
    if 'questionnaire' in user:
        for trialid, trial in enumerate(user['trials']):
            values = [trial.get(key, '') for key in trial_keys] # trial.get(key) is hetzelfde als trial[key], maar trial.get(key,'') geeft '' als key niet bestaat
            d.append([userid, trialid] + values)
columns = ['userid', 'trialid'] + trial_keys
df_trials = pd.DataFrame(d, columns=columns)
df_trials.time /= 1000

questions = ['age', 'exp', 'adapt', 'clear', 'easy', 'hint', 'learn', 'like', 'order']
d = []
for userid, user in data['users'].items(): # items geeft een lijst met (key,value) tuples uit de dictionary
    if 'questionnaire' in user:
        anwers = [int(user['questionnaire'][q]) for q in questions] # antwoorden voor iedere vraag in een lijst
        version = 'random' if user['randomStrategy'] else 'adaptive'
        salary = user['totalScore']
        user_trials = df_trials[df_trials.userid == userid]
        mean_score = user_trials.score.mean()
        mean_time = user_trials.time.mean()
        trial_count = len(user_trials)
        d.append([userid, version, trial_count, salary, mean_score, mean_time] + anwers)
columns = ['userid', 'version', 'trial_count', 'salary', 'mean_score', 'mean_time'] + questions
df_users = pd.DataFrame(d, columns=columns)

print(len(df_users[df_users.version == "random"].age))
TTestResult = collections.namedtuple('TTestResult', ['p','t','mean_rand','mean_adap','std_rand','std_adap'])

def ttest(var):
    rand = df_users[df_users.version == 'random'][var]
    adap = df_users[df_users.version == 'adaptive'][var]
    t, p = scipy.stats.ttest_ind(rand, adap)
    return TTestResult(p, t, rand.mean(), adap.mean(), rand.std(), adap.std())

result = ttest('easy')
print("result of ttest was: ")
print(result)

indep_var = 'age'
indep = df_users[[indep_var,'version']].copy()
indep.version = indep.version == 'adaptive'
dep = df_users['mean_time']

c = sklearn.linear_model.LinearRegression()
c.fit(indep, dep)
val = sklearn.feature_selection.f_regression(indep, dep)
print("After this line, the F and p value of coefficient 0 is given")
print(val)
print("Hierna komen intercept en coefficient")
print(c.intercept_, c.coef_)
print("std adapt")
print(df_users[df_users.version == "random"].mean_time.std())

print(sklearn.feature_selection.f_regression(indep, dep))

#print(scipy.stats.linregress(indep,dep))

# In[141]:

x = range(int(indep[indep_var].max())) # bijvoorbeeld indep_var "age" de maximum age en dan een lijst van 0 tot max "age"
values = [[c.predict([[i,v]])[0] for i in x] for v in [0,1]] # 0 is random, 1 is adaptive
#score = int + a*versie + b*exp

y = values

fig = plt.figure()

ax1 = fig.add_subplot(111)

ax1.set_xlabel('age')
ax1.set_ylabel('average mean time')

ax1.plot(x,np.array(y[0]).T, label='random version') # make label for random and for adaptive
ax1.plot(x,np.array(y[1]).T, label='adaptive version')
ax1.scatter(indep[indep.version == False][indep_var], dep[indep.version == False], label='random mean time', marker='x')
ax1.scatter(indep[indep.version == True][indep_var], dep[indep.version == True], label='adaptive mean time', marker='x')

leg = ax1.legend()

plt.show()

group = df_users[df_users.version == 'random']
indep = group[['exp']]
dep = group['mean_time']
c = sklearn.linear_model.LinearRegression()
c.fit(indep, dep)
c.intercept_, c.coef_

print(sklearn.feature_selection.f_regression(indep, dep)) # list of F values and of p values for each regressor

group = df_users[df_users.version == 'adaptive']
indep = group[['exp']]
dep = group['mean_time']
c = sklearn.linear_model.LinearRegression()
c.fit(indep, dep)
c.intercept_, c.coef_


import sklearn.feature_selection

#print(sklearn.feature_selection.f_regression(indep, dep))

