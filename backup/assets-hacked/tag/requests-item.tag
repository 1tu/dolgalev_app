<requests-item>
  <p>request</p>

  var t = this
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    t.update({data: s.requests.getCurrent()})
  })
  
</requests-item>
