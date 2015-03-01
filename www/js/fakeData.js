var fake = {

  doctors: [
    {
      "id": 1,
      "last_name": "Долгалев",
      "first_name": "Александр",
      "second_name": "Александрович",
      "email": "enim.Etiam.gravida@mollis.edu",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 2,
      "last_name": "Долгалева",
      "first_name": "Людмила",
      "second_name": "Анатольевна",
      "email": "gravida@mi.ca",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 3,
      "last_name": "Соболев",
      "first_name": "Дмитрий",
      "second_name": "Александрович",
      "email": "ut@sociisnatoque.net",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 4,
      "last_name": "Корниенко",
      "first_name": "Сергей",
      "second_name": "Владимирович",
      "email": "at.sem@tinciduntvehicula.ca",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 5,
      "last_name": "Черная",
      "first_name": "Инна",
      "second_name": "Анатольевна",
      "email": "nibh.Donec.est@augueSedmolestie.org",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 6,
      "last_name": "Миленина",
      "first_name": "Алла",
      "second_name": "Адамовна",
      "email": "vel.sapien.imperdiet@at.com",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 7,
      "last_name": "Сегида",
      "first_name": "Ирина",
      "second_name": "Владимировна",
      "email": "sed@Maurisquis.edu",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 8,
      "last_name": "Шагимарданова",
      "first_name": "Анна",
      "second_name": "Владиславовна",
      "email": "quis.diam.luctus@atfringillapurus.org",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    },
    {
      "id": 9,
      "last_name": "Соколовская",
      "first_name": "Марина",
      "second_name": "Руслановна",
      "email": "Integer.tincidunt@primis.org",
      "schedule": [{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'},{'begin': '8:00', 'end': '20:00'}]
    }
  ],

  requests: [
    {"id":1,"doctor_id":1,"date":"2015/02/14","time_begin":"11:36","time_end":"18:04"},
    {"id":2,"doctor_id":1,"date":"2015/05/05","time_begin":"9:39","time_end":"15:19"}
  ],

  receptions: [
    {"id":1,"doctor_id":3,"state":"confirmed","type":"pull_tooth","datetime":"2015-03-05T09:47:56Z"},
    {"id":2,"doctor_id":2,"state":"not_confirmed","type":"reception","datetime":"2015-03-26T10:30:43Z"},
    {"id":3,"doctor_id":1,"state":"confirmed","type":"reception","datetime":"2015-03-26T08:55:00Z"}
  ]

}