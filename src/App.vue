<template>
  <BaseSpinner v-if="isLoading"></BaseSpinner>
  <div class="textarea" v-if="!isLoading">
    <span
      v-for="(word, index) in words"
      :key="word"
      class="word"
      :class="{
        right: word.trueness,
        wrong: word.trueness === false,
        highlight: wordIndex === index,
      }"
      >{{ word.text }}</span
    >
  </div>
  <div class="input-row" v-if="!isLoading">
    <input
      type="text"
      class="input"
      @keydown.space="checkWord"
      @focus.once="startTimer"
      v-model.trim="inputWord"
      :disabled="seconds === 0"
    />
    <div class="timer">
      <div class="timer__item">{{ seconds }} s</div>
    </div>
    <button class="reload" @click="reloadPage">
      <MdRefreshIcon></MdRefreshIcon>
    </button>
  </div>
  <TestResults
    v-if="seconds === 0"
    :rightAnswers="rightAnswers"
    :wrongAnswers="wrongAnswers"
  ></TestResults>
</template>

<script>
import BaseSpinner from './components/BaseSpinner.vue';
import TestResults from './components/TestResults.vue';
import MdRefreshIcon from 'vue-ionicons/dist/md-refresh.vue';
export default {
  components: {
    BaseSpinner,
    TestResults,
    MdRefreshIcon,
  },
  data() {
    return {
      words: [],
      inputWord: '',
      wordIndex: 0,
      isLoading: false,
      seconds: 60,
      timer: null,
      rightAnswers: 0,
      wrongAnswers: 0,
      numOfCharacters: 0,
    };
  },
  computed: {
    currentWord() {
      return this.words[this.wordIndex];
    },
  },
  methods: {
    async fetchWords() {
      this.isLoading = true;
      const response = await fetch(
        'https://random-word-api.herokuapp.com/word?number=400'
      );
      const words = await response.json();

      this.words = words.map((word) => ({ text: word, trueness: null }));
      this.isLoading = false;
    },
    verifyWord() {
      if (this.currentWord.text === this.inputWord) {
        this.currentWord.trueness = true;
      } else {
        this.currentWord.trueness = false;
      }
    },
    checkWord() {
      this.verifyWord();
      this.numOfCharacters += this.currentWord.text.length;
      this.inputWord = '';
      this.wordIndex++;
    },
    reloadPage() {
      this.words = [];
      this.inputWord = '';
      this.wordIndex = 0;
      this.fetchWords();
      this.seconds = 60;
      this.rightAnswers = 0;
      this.wrongAnswers = 0;
      clearInterval(this.timer);
    },
    decreaseTime() {
      this.seconds--;
      if (this.seconds <= 0) {
        this.countAnswers();
        clearInterval(this.timer);
      }
    },
    startTimer() {
      this.timer = setInterval(this.decreaseTime, 1000);
    },
    countAnswers() {
      for (const word of this.words) {
        if (word.trueness) {
          this.rightAnswers++;
        } else if (word.trueness === false) {
          this.wrongAnswers++;
        }
      }
    },
  },
  created() {
    this.fetchWords();
  },
  watch: {
    numOfCharacters() {
      if (this.numOfCharacters > 61) {
        this.countAnswers();
        this.words = this.words.slice(this.wordIndex, -1);
        this.wordIndex = 0;
        this.numOfCharacters = 0;
      }
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #d0ebff;
  margin-top: 50px;
}

.textarea {
  width: 1000px;
  max-height: 70px;
  overflow: hidden;
  background-color: white;
  border: 1px solid #000;
  margin: 15px auto;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}

.input {
  width: 400px;
  height: 40px;
  font-size: 20px;
  padding: 0 10px;
}

.input-row {
  display: flex;
  align-content: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.reload {
  height: 44px;
  width: 44px;
  background-color: white;
  border: 0.5px solid #000;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.word {
  font-size: 32px;
  margin-right: 15px;
}

.wrong {
  background-color: #fa5252;
}

.right {
  background-color: #20c997;
}

.highlight {
  background-color: rgba(39, 39, 39, 0.15);
}

.timer {
  display: flex;
  font-size: 24px;
  align-items: center;
  height: 44px;
  width: 75px;
  background-color: white;
  border: 0.5px solid #000;
  justify-content: center;
}

.timer__item {
  position: relative;
  min-width: 10px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
}
</style>
