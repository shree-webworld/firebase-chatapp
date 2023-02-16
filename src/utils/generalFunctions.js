import {Timestamp} from "firebase/firestore";


export let formatDate = (date) => {
                                        let getTime = date.toDate();
                                        return `${getTime}`;
                                    }
