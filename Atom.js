
<script type="text/javascript">

Atom = (function()) {
  function Atom(neighbours, value){
    this.neightbours = neightbours;
    this.value = value;
  }

  function Atom(value){
    this.value = value;
  }

  Atom.prototype.getValue = function(){
      return this.value;
  };

  Atom.prototype.getNeightbours(){
    return this.neightbours;
  }

  return Atom;
}

</script>
