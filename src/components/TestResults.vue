<template>
  <div class="results">
    <div class="results__title">
      <h3 class="title">Your speed</h3>
      <p class="result">{{ rightAnswers }} WPH</p>
    </div>
    <p class="paragraph">
      Right answers:<span class="right-answer">{{ rightAnswers }}</span>
    </p>
    <p class="paragraph">
      Wrong answers:<span class="wrong-answer">{{ wrongAnswers }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: ["rightAnswers", "wrongAnswers"],
};
</script>

<style scoped>
.results {
  background-color: white;
  padding: 10px;
  max-width: 200px;
  border: 1px solid #000;
  border-radius: 5px;
  margin: 0 auto;
}

.results__title {
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
}

.title {
  font-weight: normal;
}

.results {
  font-weight: bold;
}

.paragraph:not(:last-child) {
  margin-bottom: 5px;
}

.right-answer {
  color: green;
  margin-left: 5px;
}

.wrong-answer {
  color: red;
  margin-left: 5px;
}
</style>
