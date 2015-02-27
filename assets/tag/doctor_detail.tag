<doctor>
  <p>{ data.last_name }</p>
  <p>{ data.first_name }</p>
  <p>{ data.second_name }</p>

  <table if={ data.schedule }>
    <tr>
      <td each={ data.schedule }>{begin}</td>
    </tr>
  </table>

  var t = this
    , rc = RiotControl
    , s = stores

  t.on('mount', function() {
    tags.add(t)
    t.update({data: s.doctors.getCurrent()})
  });
  
</doctor>