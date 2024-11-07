<script setup>
import { ref } from 'vue'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const handleSubmit = async () => {
  try {
    const response = await fetch("http://localhost:8000/auth/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${formData.value.firstName} ${formData.value.lastName}`,
        email: formData.value.email,
        password: formData.value.password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Compte créé avec succès !");
    } else {
      alert(data);
    }
  } catch (error) {
    console.error("Erreur lors de la création de compte :", error);
  }
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-24 w-auto" src="../assets/logo.png" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-200">
        Création de compte
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-900 dark:text-gray-200">
              Prénom
            </label>
            <div class="mt-2">
              <input
                  id="firstName"
                  v-model="formData.firstName"
                  type="text"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-900 dark:text-gray-200">
              Nom
            </label>
            <div class="mt-2">
              <input
                  id="lastName"
                  v-model="formData.lastName"
                  type="text"
                  required
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-900 dark:text-gray-200">
            Email
          </label>
          <div class="mt-2">
            <input
                id="email"
                v-model="formData.email"
                type="email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-900 dark:text-gray-200">
            Mot de passe
          </label>
          <div class="mt-2">
            <input
                id="password"
                v-model="formData.password"
                type="password"
                autocomplete="new-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Création
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Vous avez déjà un compte ?
        <a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Connectez-vous !
        </a>
      </p>
    </div>
  </div>
</template>
