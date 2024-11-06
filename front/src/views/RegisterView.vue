<script setup>
import { ref, computed } from 'vue'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const passwordError = computed(() => {
  if (formData.value.password && formData.value.confirmPassword &&
      formData.value.password !== formData.value.confirmPassword) {
    return 'Passwords do not match'
  }
  return ''
})

const handleSubmit = () => {
  if (passwordError.value) {
    return
  }

  // Handle registration logic here
  console.log('Form submitted:', formData.value)
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight light:text-gray-900 dark:text-gray-200">
        Create your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium light:text-gray-900 dark:text-gray-200">
              First name
            </label>
            <div class="mt-2">
              <input
                  id="firstName"
                  v-model="formData.firstName"
                  type="text"
                  required
                  class="block w-full rounded-md border-0 py-1.5 light:text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium light:text-gray-900 dark:text-gray-200">
              Last name
            </label>
            <div class="mt-2">
              <input
                  id="lastName"
                  v-model="formData.lastName"
                  type="text"
                  required
                  class="block w-full rounded-md border-0 py-1.5 light:text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium light:text-gray-900 dark:text-gray-200">
            Email address
          </label>
          <div class="mt-2">
            <input
                id="email"
                v-model="formData.email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 light:text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium light:text-gray-900 dark:text-gray-200">
            Password
          </label>
          <div class="mt-2">
            <input
                id="password"
                v-model="formData.password"
                type="password"
                autocomplete="new-password"
                required
                class="block w-full rounded-md border-0 py-1.5 light:text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium light:text-gray-900 dark:text-gray-200">
            Confirm password
          </label>
          <div class="mt-2">
            <input
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                autocomplete="new-password"
                required
                class="block w-full rounded-md border-0 py-1.5 light:text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
          <p v-if="passwordError" class="mt-2 text-sm text-red-600">
            {{ passwordError }}
          </p>
        </div>

        <div>
          <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already have an account?
        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign in here
        </a>
      </p>
    </div>
  </div>
</template>

