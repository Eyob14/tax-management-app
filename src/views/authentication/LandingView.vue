<template>
  <div class="main-container">
    <div class="header">
      <h1 class="header-text">Tax Management System</h1>
      <div class="text-right button-wrapper">
        <v-btn to="/login">Login</v-btn>
        <v-btn to="/register" class="register">Register</v-btn>
      </div>
    </div>
    <div>
      <img
        src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt="Tax Management"
      />
    </div>
    <div class="text-center">
      <h2 class="py-6">Manage your taxes easily and securely</h2>
      <p class="subtitle-1">
        Our tax management application helps you track income and expenses, maximize deductions,
        prepare and file taxes, and more. Sign up now to get started!
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.main-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-text {
      font-weight: bold;
      font-size: 18px;
      margin-bottom: 20px;

      @media screen and (min-width: 768px) {
        font-size: 24px;
      }
    }

    .button-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      gap: 0.5rem;

      @media screen and (min-width: 768px) {
        gap: 1rem;
        flex-direction: row;
      }

      .v-btn {
        padding: 10px 20px;
        text-decoration: none;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }

      .v-btn:hover {
        background-color: #8400ee;
      }

      .register {
        background-color: #8400ee;
        color: #fff;
      }
    }
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 25px 0;
  }

  h2 {
    color: #555;
    font-size: 20px;
    margin-bottom: 10px;
  }

  .subtitle-1 {
    text-align: left;
    font-size: 16px;
    line-height: 1.5;
  }
}
</style>
