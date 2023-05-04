import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "OneLevelHeader",
  setup() {
    
    onMounted(() => {
        const heading = () => {
            const header = document.querySelector(".header-one-level-component");
            const menu = document.querySelector("[data-menu]");
            if (header && menu){
                menu.addEventListener("click", () => {
                    const hamburger = document.querySelector("[data-hamburger]");
                    const hamburgerClose = document.querySelector("[data-hamburger-close]");
                    menu.classList.toggle("active");
                    header.classList.toggle("active");
    
                    if(hamburger && hamburgerClose){
                        if(hamburger.classList.contains("active")){
                            hamburger.classList.remove("active");
                            hamburgerClose.classList.add("active");
                        }else{
                            hamburger.classList.add("active");
                            hamburgerClose.classList.remove("active");
                        }
                    }
                });
            }
        }
        heading();
    })

    return {};
  },
});
