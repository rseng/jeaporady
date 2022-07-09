/**
 * Components
 */

// --- Category

var CategoryComponent = Vue.extend({
  name: 'Category',

  data() {
    return {
      isActive: false };

  },

  methods: {
    onChangeTitle() {
      this.isActive = false;
    },

    onClickQ(q) {
      this.$emit('click-question', q);
    },

    onClickTitle() {
      this.isActive = true;
    } },


  mounted() {
    console.log('CategoryComponent mounted', this);
  },

  props: {
    qs: {
      required: true,
      type: Object },


    title: {
      required: true,
      type: String } },



  template: '#tmpl-category',

  watch: {
    title: 'onChangeTitle' } });



// --- Categories


var CategoriesComponent = Vue.extend({
  name: 'Categories',

  components: {
    'category': CategoryComponent },


  computed: {
    round() {
      if (this.isFinal) return 'final';

      return this.isDouble ? 'double' : 'single';
    } },


  methods: {
    onClickQ(q) {
      this.$emit('click-question', q);
    } },


  props: {
    categories: {
      required: true,
      type: Object },


    isDouble: {
      required: true,
      type: Boolean },

    isFinal: {
      required: true,
      type: Boolean } },



  template: '#tmpl-categories' });


// --- Question

var QuestionComponent = Vue.extend({
  name: 'Question',

  methods: {
    onClick() {
      this.$emit('click');
    } },


  mounted() {
    console.log('QuestionComponent mounted', this);
  },

  props: {
    content: {
      required: true,
      type: String },


    isDailyDouble: {
      required: true,
      type: Boolean } },



  template: '#tmpl-question' });


// --- Toggle

var ToggleComponent = Vue.extend({
  name: 'Toggle',

  methods: {
    onClickDouble() {
      this.$emit('click-double');
    },
    onClickFinal() {
      this.$emit('click-final');
    } },


  props: {
    isDouble: {
      required: true,
      type: Boolean },

    isFinal: {
      required: true,
      type: Boolean } },



  template: '#tmpl-toggle' });


/**
 * App
 */

var jeop = new Vue({
  el: document.querySelector('.jeop'),

  components: {
    'categories-component': CategoriesComponent,
    'question': QuestionComponent,
    'toggle': ToggleComponent },


  data() {
    return {
      activeQ: {},
      categories: categories,
      isDouble: false,
      isFinal: false,
      qContent: '' };

  },

  methods: {
    killQ(qId) {
      var qFound = false;

      for (let cat in this.categories.single) {
        this.categories.single[cat].forEach(q => {
          if (q.id === qId) {
            q.isAnswered = true;
            qFound = true;
          }
        });
      }

      if (qFound) return;

      for (let cat in this.categories.double) {
        this.categories.double[cat].forEach(q => {
          if (q.id === qId) {
            q.isAnswered = true;
            qFound = true;
          }
        });
      }

      if (qFound) return;

      for (let cat in this.categories.final) {
        if (this.categories.final[cat].id === qId) {
          this.categories.final[cat].isAnswered = true;
          qFound = true;
        }
      }
    },

    onClickIsDouble() {
      this.isDouble = !this.isDouble;
    },

    onClickIsFinal() {
      this.isFinal = !this.isFinal;

      if (this.isFinal) {
        let keys = Object.keys(categories.final);

        let keyIndex = Math.floor(Math.random() * keys.length);

        this.activeQ = categories.final[keys[keyIndex]];

        this.qContent = keys[keyIndex];

        return;
      }

      this.activeQ = {};
    },

    onClickQ(q) {
      this.activeQ = q;

      this.qContent = this.activeQ.q;
    },

    onClickQToggle() {
      if (this.isFinal) {
        if (this.qContent !== this.activeQ.q && this.qContent !== this.activeQ.a) {
          this.qContent = this.activeQ.q;
        } else {
          this.qContent = this.activeQ.a;
        }

        return;
      }

      if (this.activeQ.isDailyDouble) {
        this.activeQ.isDailyDouble = false;

        return;
      }

      if (this.activeQ.isAnswered) {
        this.activeQ = {};
        this.qContent = '';

        return;
      }

      this.killQ(this.activeQ.id);

      this.qContent = this.activeQ.a;
    } } });
