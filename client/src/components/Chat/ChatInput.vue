<template>
  <form @submit.prevent="props.addMessage" class="relative">
    <textarea
      type="text"
      ref="textarea"
      placeholder="Send a message"
      class="outline-none text-gray-300 w-full rounded-md h-10 max-h-28 bg-gray-700 focus:outline-purple-600 transition-all p-2 resize-none pr-8"
      :value="props.modelValue"
      @input="handleInput"
    />
    <svg
      class="absolute w-6 h-6 right-3 bottom-3 cursor-pointer hover:fill-gray-400 fill-gray-300"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        d="M7.275 10.475q.2.2.512.213q.313.012.538-.188l.575-.55l.525.525q.225.225.525.225q.3 0 .525-.225q.225-.225.213-.525q-.013-.3-.213-.525l-.875-.9q-.15-.15-.325-.225q-.175-.075-.375-.075t-.387.075q-.188.075-.338.225l-.9.9q-.225.225-.225.525q0 .3.225.525Zm6.25 0q.225.225.525.225q.3 0 .525-.225l.525-.525l.575.55q.225.2.525.2q.3 0 .525-.225q.225-.225.225-.525q0-.3-.225-.525l-.9-.9q-.15-.15-.337-.225q-.188-.075-.388-.075t-.375.075q-.175.075-.325.225l-.9.9q-.2.225-.2.525q0 .3.225.525ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Zm0-10Zm0 8q3.325 0 5.663-2.337Q20 15.325 20 12t-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12t2.338 5.663Q8.675 20 12 20Zm0-2.5q1.55 0 2.775-.75Q16 16 16.725 14.775q.175-.3.025-.537q-.15-.238-.5-.238h-8.5q-.35 0-.5.238q-.15.237.025.537Q8 16 9.225 16.75T12 17.5Z"
      />
    </svg>
  </form>
</template>

<script lang="ts" setup>
import { Ref, ref, onMounted } from "vue";

const props = defineProps({ modelValue: String, addMessage: Function });
const emit = defineEmits(["update:modelValue"]);

const handleInput = (event: Event) => {
  if (isTargetValid(event?.target))
    emit("update:modelValue", event.target.value);
};

const textarea: Ref<HTMLTextAreaElement | null> = ref(null);

const isTextAreaDomElement = (
  element: Ref<HTMLTextAreaElement | null>
): element is Ref<HTMLTextAreaElement> => {
  return element.value !== null;
};

const resizeTextArea = (event: Event) => {
  if (isTextAreaDomElement(textarea)) {
    if (isTargetValid(event.target)) {
      let scHeight = event.target.scrollHeight;
      textarea.value.style.height = `${scHeight}px`;
      if (event.target.value.length == 0) {
        textarea.value.style.height = `40px`;
      }
    }
  }
};

const isTargetValid = (
  target: EventTarget | null
): target is HTMLTextAreaElement => {
  return target !== null;
};

onMounted(() => {
  if (isTextAreaDomElement(textarea)) {
    textarea.value.addEventListener("keyup", (event) => {
      if (isTargetValid(event.target)) {
        let scHeight = event.target.scrollHeight;
        textarea.value.style.height = `${scHeight}px`;
        if (event.target.value.length == 0) {
          textarea.value.style.height = `40px`;
        }
      }
    });
  }
});
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #d1d5db;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
