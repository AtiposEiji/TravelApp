import { defineComponent} from "vue";

export default defineComponent({
    name: 'AddButton',
    props: {
        text: {
            type: String,
            required: true
        },
        link: {
            type: String,
            required: true
        }
    },
    setup(props) {

        return {
            text: props.text,
            link: props.link
        }
    }
});
