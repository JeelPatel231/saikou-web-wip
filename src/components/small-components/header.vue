<template>
<div class="navbar padded-center-container unselectable">
    <div class="logo"></div>
    <div class="buttons">
        <router-link class="search btn material-icons-round" :to="{name:'Search',params:{fragment:fragment}}">
            search
        </router-link>
        <router-link class="search btn material-icons-round" :to="{path:'#'}">
            account_circle
        </router-link>
    </div>
</div>
</template>

<script>
export default{
    name:"headbar",
    props:["fragment"]
}
</script>

<style lang="scss">
.navbar{
    display: flex;
    height: 60px;
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    width: 100%;
    z-index:1;
}
.buttons{
    font-size: 2.4rem;
    background: #333;
    align-items: center;
    padding: 0 16px;
    border-radius: 100px;
    display: flex;
    color: #fff;
    margin-left: auto;
}
.btn{
    margin: 0 8px;
}
.logo{
    background-image: url("/logo.svg");
    height:100%;
    width: 60px;
    background-size: 90px;
    background-position: -15px;
}
</style>