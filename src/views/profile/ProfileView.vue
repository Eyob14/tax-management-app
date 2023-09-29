<template>
  <AppLayOut>
    <div class="user-profile">
      <div class="user-profile-details">
        <div class="user-profile__details__avatar">
          <v-avatar size="150">
            <img :src="Avatar" alt="avatar" />
          </v-avatar>
        </div>
        <div class="user-profile-info">
          <h2 class="user-name">{{ capitalizedUser.userName }}</h2>
          <p class="user-role">{{ capitalizedUser.role }}</p>
        </div>
      </div>
      <div class="user-profile-details-info">
        <h2 class="profile-title">Personal Information</h2>
        <v-divider></v-divider>
        <div class="info-wrapper">
          <span class="info-title">FullName:</span>
          <span class="info-content">{{ fullName }}</span>
        </div>
        <div class="info-wrapper">
          <span class="info-title">Phone Number:</span>
          <span class="info-content">{{ capitalizedUser.phoneNumber }}</span>
        </div>
        <div class="info-wrapper">
          <span class="info-title">Address:</span>
          <span class="info-content">{{ capitalizedUser.address }}</span>
        </div>
      </div>
    </div>
  </AppLayOut>
</template>

<style scoped>
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.user-profile-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
  width: 100%;

  .user-profile__details__avatar {
    margin-bottom: 1rem;
  }

  .user-profile-info {
    text-align: center;

    .user-name {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 0.5rem;
    }

    .user-role {
      font-size: 1.5rem;
    }
  }
}

.user-profile-details-info {
  margin-top: 2rem;
  width: 100%;
  max-width: 600px;

  .profile-title {
    font-size: 2rem;
  }
  .info-wrapper {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .info-title {
      display: block;
      font-size: 1.5rem;
    }
    .info-content {
      display: block;
      font-size: 1.2rem;
    }
  }
}

/* Add responsive styles for smaller screens */
@media (max-width: 768px) {
  .user-profile-details {
    .user-profile-info {
      .user-name {
        font-size: 1.5rem;
      }

      .user-role {
        font-size: 1rem;
      }
    }
  }

  .user-profile-details-info {
    .profile-title {
      font-size: 1rem;
    }
  }
}
</style>

<script setup>
import { ref, computed } from 'vue'
import AppLayOut from '../../components/AppLayOut.vue'
import AuthenticationManager from '../../storage/AuthenticationManager'
import Avatar from '../../assets/avatar-one.png'

const loggedInUser = ref(AuthenticationManager.getLoggedInUser())

const capitalizedUser = computed(() => {
  const user = {
    firstName:
      loggedInUser.value.firstName[0].toUpperCase() + loggedInUser.value.firstName.slice(1),
    lastName: loggedInUser.value.lastName[0].toUpperCase() + loggedInUser.value.lastName.slice(1),
    phoneNumber: loggedInUser.value.phoneNumber,
    address: loggedInUser.value.address[0].toUpperCase() + loggedInUser.value.address.slice(1),
    role: loggedInUser.value.role[0].toUpperCase() + loggedInUser.value.role.slice(1),
    userName: loggedInUser.value.userName[0].toUpperCase() + loggedInUser.value.userName.slice(1)
  }

  return user
})

const fullName = computed(() => {
  return `${capitalizedUser.value.firstName} ${capitalizedUser.value.lastName}`
})
</script>
