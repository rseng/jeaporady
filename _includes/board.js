class Question {
  constructor(id, props) {
    this._vm = {};

    this.id = id;
    this.isAnswered = false;

    Object.assign(this, props);
  }}

{% assign data = site.data.boards[page.board_data].board %}
var rawCategories = {
  'single': { {% for entry in data.single %}
    '{{ entry.name }}': [{% for q in entry.questions %}
    {
      a: '{{ q.A }}',
      {% if q.img %}img: '{{ q.img }}',
      {% endif %}q: '{{ q.Q }}',
      val: {{ q.points }} } {% if forloop.last %}{% else %},{% endif %}{% endfor %}]{% if forloop.last %}{% else %},{% endif %}
    {% endfor %} },
  'double': { {% for entry in data.double %}
    '{{ entry.name }}': [{% for q in entry.questions %}
    {
      a: '{{ q.A }}',
      {% if q.img %}img: '{{ q.img }}',{% endif %}
      q: '{{ q.Q }}',
      {% if q.isDailyDouble %}isDailyDouble: true,{% endif %}
      val: {{ q.points }} } {% if forloop.last %}{% else %},{% endif %}{% endfor %}]{% if forloop.last %}{% else %},{% endif %}
    {% endfor %} },
  'final': { {% for entry in data.final %}
    '{{ entry.name }}': {
      a: '{{ entry.A }}',
      q: '{{ entry.Q }}',
      id: '{{ entry.id }}' }{% if forloop.last %}{% else %},{% endif %}{% endfor %}
   }
}
var categories = {
  double: _processCategory(Object.keys(rawCategories.double), rawCategories.double, 20, {}),
  final: rawCategories.final,
  single: _processCategory(Object.keys(rawCategories.single), rawCategories.single, 10, {}) };


console.log('Jeopardy Assets', categories);

function _processCategory(keys, rawCats, catIndex, cats) {
  var key = keys.shift();

  cats[key] = rawCats[key].map((q, qIndex) => new Question(catIndex + '-' + qIndex, q));

  catIndex += 1;

  return keys.length ? _processCategory(keys, rawCats, catIndex, cats) : cats;
}
