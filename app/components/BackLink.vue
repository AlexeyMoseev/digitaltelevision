<template>
  <NuxtLink to="/" class="back-link" aria-label="Вернуться на главную страницу">
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9.57 18.82c-.19 0-.38-.07-.53-.22L2.97 12.53a.75.75 0 0 1 0-1.06l6.07-6.07a.75.75 0 0 1 1.06 1.06L4.56 12l5.54 5.54a.75.75 0 0 1-1.06 1.06Z"
        fill="currentColor"
      />
      <path d="M20.5 12.75H3.67a.75.75 0 0 1 0-1.5H20.5a.75.75 0 0 1 0 1.5Z" fill="currentColor" />
    </svg>
    <span class="back-link__text">Назад</span>
  </NuxtLink>
</template>

<style scoped>
.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  text-decoration: none;
  color: var(--color-text-primary);
  transition: color var(--transition-fast);
}
.back-link:hover {
  color: var(--color-primary);
}
.back-link__text {
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-normal);
  font-size: var(--font-size-md);
  line-height: var(--line-height-tight);
}
</style>
