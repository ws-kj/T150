<script setup lang="ts">
import { ref, computed } from "vue";
import { fetchy } from "../../utils/fetchy";

const recordDate = ref("");
const recordType = ref("2kErgTest");
const recordValue = ref("");
const recordHours = ref(0);
const recordMinutes = ref(0);
const recordSeconds = ref(0);

const timeBasedRecords = ["2kErgTest", "6kErgTest", "1mRun", "5kRun"];
const longTimeBasedRecords = ["halfMarathon", "fullMarathon"];

const isTimeBased = computed(() => timeBasedRecords.includes(recordType.value));
const isLongTimeBased = computed(() => longTimeBasedRecords.includes(recordType.value));

const convertToSeconds = (value: string, isLongFormat: boolean) => {
  if (isLongFormat) {
    const [hours, minutes, seconds] = value.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  } else {
    const [minutes, seconds] = value.split(":").map(Number);
    return minutes * 60 + seconds;
  }
};

const submitRecord = async () => {
  let valueInSeconds;
  if (isLongTimeBased.value) {
    valueInSeconds = recordHours.value * 3600 + recordMinutes.value * 60 + recordSeconds.value;
  } else if (isTimeBased.value) {
    valueInSeconds = convertToSeconds(recordValue.value, false);
  } else {
    valueInSeconds = recordValue.value; // keep the weight as is
  }

  const payload = {
    date: recordDate.value,
    type: recordType.value,
    value: valueInSeconds,
  };

  console.log(payload);
  try {
    await fetchy(`/api/prs/${recordType.value}`, "POST", {
      body: { date: recordDate.value, pr: valueInSeconds },
    });
  } catch (_) {
    return;
  }
  emptyForm();
};

const emptyForm = () => {
  recordDate.value = "";
  recordType.value = "2kErgTest";
  recordValue.value = "";
  recordHours.value = 0;
  recordMinutes.value = 0;
  recordSeconds.value = 0;
};
</script>

<template>
  <form class="record-form">
    <h2>Add or Update Your Personal Record</h2>
    <div class="form-group">
      <label for="recordType">Type of Record</label>
      <select id="recordType" v-model="recordType" required>
        <option value="2kErgTest">2k Erg Test</option>
        <option value="6kErgTest">6k Erg Test</option>
        <option value="1mRun">1mile Run</option>
        <option value="5kRun">5k Run</option>
        <option value="halfMarathon">Half Marathon Erg</option>
        <option value="fullMarathon">Full Marathon Erg</option>
        <option value="maxBenchPress">Max Bench Press</option>
        <option value="maxSquat">Max Squat</option>
      </select>
    </div>
    <div class="form-group">
      <label for="recordDate">Date of Record</label>
      <input type="date" id="recordDate" v-model="recordDate" required />
    </div>
    <div class="form-group" v-if="isTimeBased">
      <label for="recordTime">Record Time (MM:SS)</label>
      <input type="text" id="recordTime" v-model="recordValue" placeholder="MM:SS" required />
    </div>
    <div class="form-group" v-if="isLongTimeBased">
      <label for="recordHours">Record Time (HH:MM:SS)</label>
      <div class="time-inputs">
        <input type="number" id="recordHours" v-model.number="recordHours" placeholder="HH" required />
        <input type="number" id="recordMinutes" v-model.number="recordMinutes" placeholder="MM" required />
        <input type="number" id="recordSeconds" v-model.number="recordSeconds" placeholder="SS" required />
      </div>
    </div>
    <div class="form-group" v-else-if="recordType === 'maxBenchPress'">
      <label for="recordWeight">Record Weight (lb)</label>
      <input type="number" id="recordWeight" v-model="recordValue" placeholder="Enter weight in lb" required />
    </div>
    <div class="form-group" v-else-if="recordType === 'maxSquat'">
      <label for="recordWeight">Record Weight (lb)</label>
      <input type="number" id="recordWeight" v-model="recordValue" placeholder="Enter weight in lb" required />
    </div>
    <button type="submit" @click.prevent="submitRecord">Submit</button>
  </form>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.record-form {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 2em;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 1.5em;
  color: #00796b;
  margin-bottom: 1em;
}

.form-group {
  width: 100%;
  margin-bottom: 1em;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5em;
  color: #333;
}

select,
input[type="text"],
input[type="date"],
input[type="number"] {
  width: 100%;
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  font-size: 1em;
}

.time-inputs {
  display: flex;
  gap: 0.5em;
}

button {
  background-color: #00796b;
  color: white;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  font-family: "Roboto", sans-serif;
}

button:hover {
  background-color: #005f56;
}
</style>
