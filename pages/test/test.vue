<template>
  <div>
    <input type="text" @confirm="handleInput" />
    <button @click="saveData">保存</button>
    <ul>
      <li v-for="(item, index) in dataList" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: '',
      dataList: [],
    };
  },
  methods: {
    handleInput(event) {
      this.inputValue = event.target.value;
	  if (this.inputValue.trim() !== '') {
	    this.dataList.push(this.inputValue);
	    this.inputValue = '';
	  }
    },
    saveData() {
      if (this.inputValue.trim() !== '') {
        this.dataList.push(this.inputValue);
        this.inputValue = '';
      }
    },
  },
};
</script>