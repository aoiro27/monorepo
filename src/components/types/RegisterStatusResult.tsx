export type RegisterStatusResult = {
    registerdMail: string;
    oneUid: string;
    isPaidUser: boolean;
    tags: 
        {
            tagName: string;
            mailItems: 
                {
                    deliveryMail: string;
                    isAuthenticated: boolean;
                }[]
            
        }[]
};
