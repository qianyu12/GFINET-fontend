<template>
  <div id="test">
    <p>{{id}}</p>
    <p>{{title}}</p>
    <p>{{test}}</p>
    <p>{{handleTest}}</p>
    <button @click="questionU">{{question}}</button>
    <button @click="changeTest">改变test</button>
    <div class="view" :class="{'active':isActive, 'has-error':hasError}">测试class与style绑定</div>
    <div :class="{classObject}">测试class与style绑定</div>
    <div :class="testObject">测试class与style绑定</div>
  </div>
</template>
<script>
export default {
  name: 'Test',
  data() {
    return {
      test: 'this is a test file',
      question: 'R u ok?',
      isActive: true,
      hasError: true
    }
  },
  computed: {
    handleTest() {
      return this.test
        .split('')
        .reverse()
        .join('')
    },
    classObject() {
      return this.isActive && this.hasError
    },
    testObject() {
      return {
        active: this.isActive,
        hasError: this.hasError
      }
    }
  },
  watch: {
    test(newValue, oldValue) {
      console.log('tag', oldValue)
    }
  },
  methods: {
    questionU() {
      alert('hey man')
    },
    changeTest() {
      this.test = 'fx'
    }
  },
  props: ['id', 'title']
}
</script>
<style>
.view {
  color: red;
}
.active {
  color: blue;
}
.view.active.has-error {
  color: rebeccapurple;
}
.classObject {
  color: yellow;
}
</style>
