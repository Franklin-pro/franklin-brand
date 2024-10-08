<template>
  <div class="flex flex-col gap-y-4">
      <div class="rounded-lg bg-slate-50 p-5 flex justify-between items-center">
          <div class="flex justify-between items-center gap-4">
           <img src="../assets/me.png" alt="" width="100" height="100" class="rounded-full"/>
              <div class="flex flex-col gap-y-1">
                  <p class="text-sm">{{ userInfo.lastName + ' ' + userInfo.firstName }}</p>
                  <p class="text-xs font-thin">{{ userInfo.bio }}</p>
                  <p class="text-xs font-thin">{{ userInfo.city + ', ' + userInfo.country }}</p>
              </div>
          </div>
          <div>
              <!-- <Button severity="secondary" outlined> <span>Edit <i class="pi pi-pencil"></i></span></Button> -->
          </div>
      </div>
      <div class="rounded-lg bg-slate-50 p-5 flex justify-between items-start">
          <div class=" md:w-2/3">
              <p class="font-medium">Personal Information</p>
              <div v-if="!isEditInfo" class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                  <div class="flex flex-col gap-y-1">
                      <p class="text-sm">First Name</p>
                      <p class="text-xs font-thin">{{ userInfo.firstName }}</p>
                  </div>
                  <div class="flex flex-col gap-y-1">
                      <p class="text-sm">Last Name</p>
                      <p class="text-xs font-thin">{{ userInfo.lastName }}</p>
                  </div>
                  <div class="flex flex-col gap-y-1">
                      <p class="text-sm">Email Address</p>
                      <p class="text-xs font-thin">{{ userInfo.email }}</p>
                  </div>
                  <div class="flex flex-col gap-y-1">
                      <p class="text-sm">phone</p>
                      <p class="text-xs font-thin">{{ userInfo.phone }}</p>
                  </div>
                  <div class="flex flex-col gap-y-1">
                      <p class="text-sm">Bio</p>
                      <p class="text-xs font-thin">{{ userInfo.bio }}</p>
                  </div>
              </div>
              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                  <div class="flex flex-col gap-y-1">
                      <label for="location" class="font-thin">First Name</label>
                      <InputText v-model="userInfo.firstName" placeholder="Enter your First name" />
                  </div>
                  <div class="flex flex-col gap-y-1">
                      <label for="location" class="font-thin">Last Name</label>
                      <InputText v-model="userInfo.lastName" placeholder="Enter your Last name" />
                  </div>
                  <div class="flex flex-col gap-y-1">
                      <label for="location" class="font-thin">Email Address</label>
                      <InputText v-model="userInfo.email" placeholder="Enter your Email" />
                  </div>
                  <div class="flex flex-col gap-y-1">
                      <label for="location" class="font-thin">Phone number</label>
                      <InputText v-model="userInfo.phone" placeholder="Enter your Phone" />
                  </div>
                  <div class="flex flex-col gap-y-1">
                      <label for="location" class="font-thin">Bio</label>
                      <InputText v-model="userInfo.bio" placeholder="Enter your Bio" />
                  </div>
              </div>
          </div>
          <div class="flex gap-x-4">
              <Button severity="secondary" outlined @click="isEditInfo = true" v-if="!isEditInfo"> <span>Edit <i
                          class="pi pi-pencil"></i></span></Button>
              <Button severity="danger" outlined @click="isEditInfo = false" v-if="isEditInfo">
                  <span>Discard</span></Button>
              <Button severity="primary" @click="isEditInfo = false" v-if="isEditInfo">
                  <span>Save</span></Button>
          </div>
      </div>
      <div class="rounded-lg bg-slate-50 p-5 flex justify-between items-start">
          <div class=" md:w-2/3">
              <p class="font-medium">Security</p>
              <div v-if="!isEditAddress" class=" md:w-2/3">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                      <div class="flex flex-col gap-y-1">
                          <p class="text-sm">security password</p>
                          
                      </div>
          \
                  </div>
              </div>
              <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
                  <div class="flex flex-col gap-y-1">
                      <label for="location" class="font-thin">Current Password</label>
                      <InputText  placeholder="Enter Current Password" />
                  </div>
                  <div class="flex flex-col gap-y-1">
                      <label for="location" class="font-thin">New Password</label>
                      <InputText placeholder="Enter New Password" />
                  </div>
                  <div class="flex flex-col gap-y-1">
                      <label for="location" class="font-thin">Confirm New Password</label>
                      <InputText placeholder="Confirm New Password" />
                  </div>
              </div>
          </div>
          <div class="flex gap-x-4">
              <Button severity="secondary" outlined @click="isEditAddress = true" v-if="!isEditAddress"> <span>Edit <i
                          class="pi pi-pencil"></i></span></Button>
              <Button severity="danger" outlined @click="isEditAddress = false" v-if="isEditAddress">
                  <span>Discard</span></Button>
              <Button severity="primary" @click="isEditAddress = false" v-if="isEditAddress">
                  <span>Save</span></Button>
          </div>
      </div>
  </div>
</template>

<script lang="ts" setup>

const userInfo = ref({
  firstName: "Jean Paul",
  lastName: "Mugisha",
  email: "mugishajean@gmail.com",
  phone: "+250788821034",
  bio: "Owner",
  country: "Rwanda",
  city: "Kigali",
  postalCode: "ERT 0000",
  taxId: "SDC 1021876756"
})

definePageMeta({
  layout:'default',
//   middleware:'authentication'
})
const isEditInfo = ref(false)
const isEditAddress = ref(false)
</script>

<style>

</style>