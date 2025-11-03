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
  background: #ffffff;
  box-sizing: border-box;
  box-shadow:
    -2px 5px 13px 0px #0000000a,
    -9px 21px 23px 0px #0000000a,
    -21px 48px 31px 0px #00000005,
    -37px 85px 37px 0px #00000003,
    -57px 133px 40px 0px #00000000;
}
.date {
  display: flex;
  align-items: center;
  color: #bec2da;
  font-family: 'FuturaPT', Roboto, Arial, sans-serif;
  font-weight: 400;
}
.title {
  font-family: 'SourceSans3', Roboto, Arial, sans-serif;
  font-weight: 600;
  line-height: 120%;
  overflow-wrap: break-word;
}
.short-description {
  font-family: 'FuturaPT', Roboto, Arial, sans-serif;
  line-height: 120%;
  overflow-wrap: break-word;
}
.description-html {
  color: #14142a;
  font-family: 'FuturaPT', Roboto, Arial, sans-serif;
  font-weight: 400;
  font-size: 20px;
  line-height: 140%;
  overflow-wrap: break-word;
}

/* Вариация list */
.card-list {
  width: 276px;
  height: 273px;
  padding: 32px 24px;
  gap: 20px 0;
  border-radius: 24px;
}
.date-list {
  gap: 0 8px;
  font-size: 16px;
  line-height: 100%;
}
.calendar-img-list {
  width: 20px;
  height: 20px;
}
.title-list {
  font-size: 20px;
}
.short-description-list {
  color: #81859c;
  font-size: 16px;
  font-weight: 400;
}

/* Вариация detail */
.card-detail {
  width: 100%;
  gap: 24px 0;
  padding: 64px;
  border-radius: 32px;
}
.date-detail {
  font-size: 20px;
  line-height: 140%;
  gap: 0 12px;
}
.calendar-img-detail {
  width: 24px;
  height: 24px;
}
.title-detail {
  font-size: 36px;
}
.short-description-detail {
  color: #14142a;
  font-size: 22px;
  font-weight: 600;
}

@media (max-width: 480px) {
  .description-html {
    font-size: 16px;
  }
  /* Вариация list */
  .card-list {
    width: 288px;
    height: 236px;
    padding: 24px;
    gap: 16px 0;
  }
  .date-list {
    font-size: 14px;
  }
  .calendar-img-list {
    width: 16px;
    height: 16px;
  }
  .title-list {
    font-size: 18px;
  }
  .short-description-list {
    font-size: 14px;
  }

  /* Вариация detail */
  .card-detail {
    padding: 24px 16px;
    border-radius: 24px;
  }
  .date-detail {
    font-size: 18px;
    line-height: 120%;
    gap: 0 8px;
  }
  .calendar-img-detail {
    width: 20px;
    height: 20px;
  }
  .title-detail {
    font-size: 24px;
  }
  .short-description-detail {
    font-size: 18px;
  }
}
</style>
