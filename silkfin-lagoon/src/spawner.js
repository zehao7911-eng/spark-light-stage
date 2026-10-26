function Spawner(width, height, player, fishes) {
  this.width = width
  this.height = height
  this.player = player
  this.fishes = fishes
  this.currentZone = [this.player.x, this.player.y]
  this.zones = this.getAdjacentZones().map(this.spawn.bind(this)).concat([this.currentZone])
}
Spawner.prototype.resize = function(width, height) {
  this.width = width
  this.height = height
  this.currentZone = [this.player.x, this.player.y]
  this.zones = this.getAdjacentZones().concat([this.currentZone])
}
Spawner.prototype.update = function() {
  var i = this.zones.length
  while(i--) {
    if(this.zones[i] === this.currentZone) continue
    if(Math.abs(this.player.x - this.zones[i][0]) < this.width/2 && Math.abs(this.player.y - this.zones[i][1]) < this.height/2) {
      this.currentZone = this.zones[i]

      // spawn in new adjacent zones
      var self = this
      var newZones = this.getAdjacentZones().filter(function getNewZones(zone){
        return self.zones.every(function(zone2){
          return !(zone2[0]===zone[0] && zone2[1]===zone[1])
        })
      })

      newZones.forEach(this.spawn.bind(this))
      this.zones = this.zones.concat(newZones)
    }

    // if zone is really far from user, remove it
    if(distance({x: this.zones[i][0], y: this.zones[i][1]}, this.player) > Math.max(this.width, this.height)*2) {
      this.zones.splice(i, 1)
    }
  }

}
Spawner.prototype.spawn = function(zone) {
  if(this.fishes.length>32)return zone;
  var baseX=zone[0]+Math.random()*this.width*.45-this.width*.225;
  var baseY=zone[1]+Math.random()*this.height*.45-this.height*.225;
  for(var j=0;j<3&&this.fishes.length<34;j++){
    var f=new Fish(true,baseX+j*30,baseY+Math.sin(j)*22,Math.max(6,this.player.size*.48),Math.random()*6.28-3.14,0);
    f.food=true;f.maxSpeed=1.3;this.fishes.push(f);
  }
  if(this.fishes.length<34&&currentReef>0&&this.fishes.filter(function(f){return f.danger&&!f.dying&&!f.dead;}).length<Math.min(3,Math.ceil(currentReef/2))&&Math.random()<.6){var f=new Fish(true,zone[0]+110,zone[1]-110,this.player.size+9,0,0);f.danger=true;f.maxSpeed=1.6;this.fishes.push(f);}
  return zone
}
Spawner.prototype.debug = function() {
  for(var i=0;i<this.zones.length;i++) {
    var zone = this.zones[i]
    ctx.strokeRect(zone[0] - this.width/2, zone[1] - this.height/2, this.width, this.height)
  }
}
Spawner.prototype.getAdjacentZones = function() {
  var self = this
  var dirs = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]]
  var coords = dirs.map(function(dir) {
    return [dir[0]*self.width+self.currentZone[0], dir[1]*self.height+self.currentZone[1]]
  })

  return coords
}
