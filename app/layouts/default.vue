<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <NuxtLink class="logo-link" to="/" aria-label="Перейти на главную страницу">
          <img class="logo" alt="" src="~/assets/images/logo.svg" aria-hidden="true" />
        </NuxtLink>
        <button
          v-if="!isCreating"
          class="btn"
          :disabled="store.loading"
          :aria-label="store.loading ? 'Загрузка...' : 'Создать новый материал'"
          @click="router.push('/create')"
        >
          <span v-if="!store.loading" class="btn-text">Создать материал</span>
          <img
            v-if="!store.loading"
            class="btn-icon"
            src="~/assets/images/plus.svg"
            alt=""
            aria-hidden="true"
          />
          <img
            v-else
            class="btn-loader-img"
            src="~/assets/images/loader.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
        <button
          v-else
          class="btn"
          :disabled="store.loading"
          :aria-label="store.loading ? 'Сохранение...' : 'Сохранить материал'"
          @click="handleClick"
        >
          <span v-if="!store.loading" class="btn-text">Сохранить</span>
          <img
            v-if="!store.loading"
            class="btn-icon"
            src="~/assets/images/send.svg"
            alt=""
            aria-hidden="true"
          />
          <img
            v-else
            class="btn-loader-img"
            src="~/assets/images/loader.svg"
            alt=""
            aria-hidden="true"
          />
        </button>
      </div>
    </header>
    <div class="main">
      <slot />
      <NotificationWidget />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const store = useMaterialsStore()

const isCreating = computed(() => route.name === 'create')

const handleClick = async () => {
  if (!isCreating.value) return
  const ok = await store.saveCurrentMaterial()
  if (ok) {
    await router.push('/')
    await store.fetchList(true)
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background: var(--color-background);
}
.header {
  background: var(--color-white);
  padding: 20px 0;
}
.header-content {
  max-width: var(--max-width-header);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding-left: var(--container-padding);
  padding-right: var(--container-padding);
}
.logo-link {
  display: flex;
  align-items: center;
}
.logo {
  width: 114.58px;
  height: 44px;
}
.btn {
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10.5px 24px;
  text-decoration: none;
  border-radius: 12px;
  border: none;
  box-sizing: border-box;
  background: #e7f8fe;
  color: #00b2ff;
  cursor: pointer;
  font-family: 'FuturaPT', Roboto, Arial, sans-serif;
  line-height: 100%;
  font-weight: 450;
  font-size: 18px;
  transition: background-color 0.15s ease;
}
.btn:hover,
.btn:active {
  background: #d2f3ff;
}
.btn:disabled {
  background: #e7f8fe;
  cursor: not-allowed;
}
.btn-text {
  display: inline;
}
.btn-icon {
  display: none;
}
.btn-loader-img {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}
.main {
  margin-top: var(--spacing-2xl);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 480px) {
  .header {
    padding: var(--spacing-xs) 0;
  }
  .logo-link {
    height: 36px;
  }
  .logo {
    width: 93.75px;
    height: 36px;
  }
  .btn {
    width: 48px;
    height: 48px;
    padding: 10px;
  }
  .btn-text {
    display: none;
  }
  .btn-icon {
    display: inline;
    width: 28px;
    height: 28px;
  }
  .main {
    margin-top: var(--spacing-xl);
  }
}
</style>
