export const baseUrl = "https://hatch-social.ad-wize.net";
// export const baseUrl = 'https://6f9e-103-125-71-60.ngrok-free.app';

export const imageUrl = `${baseUrl}/api/images/`;
export const profilePicUrl = `${baseUrl}/uploads`;
export const centerImageUrl = `${baseUrl}/`;

export const apiDataLimit = 10;
export const validateEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
