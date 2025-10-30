<template>
  <div class="layout">
    <header class="header">
      <div class="header-content">
        <NuxtLink class="logo-link" to="/">
          <img class="logo" alt="logo" src="~/assets/images/logo.svg" />
        </NuxtLink>
        <ClientOnly>
          <NuxtLink
            v-if="!isCreating"
            class="btn"
            to="/create"
            :aria-disabled="store.loading"
            :class="{ disabled: store.loading }"
            :tabindex="store.loading ? -1 : 0"
          >
            <span v-if="!store.loading" class="btn-text">Создать материал</span>
            <img
              v-if="!store.loading"
              class="btn-icon"
              src="~/assets/images/plus.svg"
              alt="create"
            />
            <img v-else class="btn-loader-img" src="~/assets/images/loader.svg" alt="loader" />
          </NuxtLink>
          <button v-else class="btn" :disabled="store.loading" @click="handleClick">
            <span v-if="!store.loading" class="btn-text">Сохранить</span>
            <img v-if="!store.loading" class="btn-icon" src="~/assets/images/send.svg" alt="send" />
            <img v-else class="btn-loader-img" src="~/assets/images/loader.svg" alt="loader" />
          </button>
        </ClientOnly>
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
const store = useMaterialsStore()

const isCreating = computed(() => route.name === 'create')

const handleClick = async () => {
  if (!isCreating.value) return
  const ok = await store.saveCurrentMaterial()
  if (ok) {
    store.list = []
    await navigateTo('/')
  }
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background: #f4f6fb;
}
.header {
  background: white;
  padding: 20px 0;
}
.header-content {
  max-width: 1296px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding-left: 16px;
  padding-right: 16px;
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
.btn.disabled,
.btn:disabled {
  background: #e7f8fe;
  cursor: not-allowed;
  pointer-events: none;
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
  margin-top: 48px;
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
    padding: 8px 0;
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
    margin-top: 32px;
  }
}
</style>
