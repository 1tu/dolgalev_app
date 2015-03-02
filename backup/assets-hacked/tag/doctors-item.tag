<doctors-item>
  <p>{ data.last_name }</p>
  <p>{ data.first_name }</p>
  <p>{ data.second_name }</p>

  <table if={ data.schedule }>
    <tr>
      <td each={ data.schedule }>{begin}</td>
    </tr>
  </table>

  var t = this
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    t.update({data: s.doctors.getCurrent()})
  })
  
</doctors-item>