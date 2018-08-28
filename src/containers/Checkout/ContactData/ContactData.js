import React, { Component } from "react";
import Input from "../../../components/UI/Input/Input";
import Button from "../../../components/UI/Button/Button";



class ContactData extends Component {

    state = {
        name: "",
        email: "",
        street: "",
        postCode: ""
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="name" />
                <Input inputtype="input" type="text" name="name" placeholder="name" />
                <Input inputtype="input" type="text" name="name" placeholder="name" />
                <Input inputtype="input" type="text" name="name" placeholder="name" />
                <Button></Button>
            </form>

        )


        return (
            <div>{form}</div>

        )
    }
};

export default ContactData;