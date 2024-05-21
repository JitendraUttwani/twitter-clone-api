export const loginController = (req,res) => {
    try {
        const {email, password} = req.body;
    } catch (error) {
        console.error(error);
    }
}
export const registerController = (req,res) => {
    try {
        const body = req.body;
    } catch (error) {
        console.error(error);
    }
}



