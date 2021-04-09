<template>
  <div class="theme-picker">
    <select
      @change="onThemeChange($event.currentTarget.value)"
      :value="theme"
      id="color-picker"
    >
      <option value="ironclad" class="ironclad">Ironclad</option>
      <option value="silent" class="silent">Silent</option>
      <option value="defect" class="defect">Defect</option>
      <option value="watcher" class="watcher">Watcher</option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "ThemePicker",
  components: {},
  setup() {
    const theme = ref("ironclad");

    const onThemeChange = (selectedTheme: string): void => {
      const selectedColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue(`--${selectedTheme}-color`);

      theme.value = selectedTheme;
      document.documentElement.style.setProperty(
        "--theme-color",
        selectedColor
      );
      localStorage.setItem("selectedTheme", selectedTheme);
    };

    onMounted(() => {
      const selectedTheme = localStorage.getItem("selectedTheme");
      if (selectedTheme) onThemeChange(selectedTheme);
    });

    return { theme, onThemeChange };
  },
});
</script>

<style scoped lang="scss">
.theme-picker {
  position: absolute;
  top: 0;
  right: 0;
  z-index: inherit; //TODO: Remove
}

#color-picker {
  background: var(--theme-color);
  height: 3rem;
  font-size: 1.7rem;
  option:hover {
    background: inherit;
  }
  .ironclad {
    background: var(--ironclad-color);
  }

  .silent {
    background: var(--silent-color);
  }

  .defect {
    background: var(--defect-color);
  }

  .watcher {
    background: var(--watcher-color);
  }
}
</style>
