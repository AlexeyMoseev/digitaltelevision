<template>
  <div class="card" :class="`card-${variant}`">
    <div class="date" :class="`date-${variant}`">
      <img
        :class="`calendar-img-${variant}`"
        src="~/assets/images/calendar.svg"
        alt="calendar img"
      />
      <span>{{ formatDate(material.datetime) }}</span>
    </div>
    <h1 v-if="variant === 'detail'" class="title" :class="`title-${variant}`">
      {{ material.title }}
    </h1>
    <h2 v-if="variant === 'list'" class="title" :class="`title-${variant}`">
      {{ material.title }}
    </h2>
    <p class="short-description" :class="`short-description-${variant}`">
      {{ variant === 'list' ? truncatedDescription : material.short_description }}
    </p>
    <!-- description_html is sanitized server-side -->
    <div
      v-if="variant === 'detail' && material.description_html"
      class="description-html"
      v-html="material.description_html"
    />
  </div>
</template>

<script setup lang="ts">
import type { Material } from '~/types/material'

interface Props {
  material: Material
  variant: 'list' | 'detail'
}

const props = defineProps<Props>()

const formatDate = (isoDate: string) => {
  // Using this formatting because the server removes the 'T' and 'Z' from the date,
  // which can cause incorrect date display across different time zones
  let normalizedDate = isoDate

  // Only fix the format if it's broken (contains space instead of 'T')
  if (isoDate.includes(' ') && !isoDate.includes('T')) {
    normalizedDate = isoDate.replace(' ', 'T') + 'Z'
  }

  const date = new Date(normalizedDate)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })
}

const truncatedDescription = computed(() => {
  if (props.variant !== 'list') {
    return props.material.short_description
  }

  const maxTotal = 150
  const titleLength = props.material.title?.length || 0
  const description = props.material.short_description || ''

  const remainingLength = maxTotal - titleLength

  if (description.length <= remainingLength) {
    return description
  }

  return description.slice(0, remainingLength - 1) + '...'
})
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  box-sizing: border-box;
  box-shadow: var(--shadow-card);
}
.date {
  display: flex;
  align-items: center;
  color: var(--color-text-tertiary);
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-normal);
}
.title {
  font-family: var(--font-family-heading);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-normal);
  overflow-wrap: break-word;
}
.short-description {
  font-family: var(--font-family-primary);
  line-height: var(--line-height-normal);
  overflow-wrap: break-word;
}
.description-html {
  color: var(--color-text-primary);
  font-family: var(--font-family-primary);
  font-weight: var(--font-weight-normal);
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  overflow-wrap: break-word;
}

/* Вариация list */
.card-list {
  width: 276px;
  height: 273px;
  padding: var(--spacing-xl) var(--spacing-lg);
  gap: 20px 0;
  border-radius: var(--radius-xl);
}
.date-list {
  gap: 0 var(--spacing-xs);
  font-size: var(--font-size-sm);
  line-height: var(--line-height-tight);
}
.calendar-img-list {
  width: 20px;
  height: 20px;
}
.title-list {
  font-size: var(--font-size-lg);
}
.short-description-list {
  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
}

/* Вариация detail */
.card-detail {
  width: 100%;
  gap: var(--spacing-lg) 0;
  padding: var(--spacing-3xl);
  border-radius: var(--radius-2xl);
}
.date-detail {
  font-size: var(--font-size-lg);
  line-height: var(--line-height-relaxed);
  gap: 0 var(--spacing-sm);
}
.calendar-img-detail {
  width: 24px;
  height: 24px;
}
.title-detail {
  font-size: var(--font-size-3xl);
}
.short-description-detail {
  color: var(--color-text-primary);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
}

@media (max-width: 480px) {
  .description-html {
    font-size: var(--font-size-sm);
  }
  /* Вариация list */
  .card-list {
    width: 288px;
    height: 236px;
    padding: var(--spacing-lg);
    gap: var(--spacing-md) 0;
  }
  .date-list {
    font-size: var(--font-size-xs);
  }
  .calendar-img-list {
    width: 16px;
    height: 16px;
  }
  .title-list {
    font-size: var(--font-size-md);
  }
  .short-description-list {
    font-size: var(--font-size-xs);
  }

  /* Вариация detail */
  .card-detail {
    padding: var(--spacing-lg) var(--spacing-md);
    border-radius: var(--radius-xl);
  }
  .date-detail {
    font-size: var(--font-size-md);
    line-height: var(--line-height-normal);
    gap: 0 var(--spacing-xs);
  }
  .calendar-img-detail {
    width: 20px;
    height: 20px;
  }
  .title-detail {
    font-size: var(--font-size-2xl);
  }
  .short-description-detail {
    font-size: var(--font-size-md);
  }
}
</style>
