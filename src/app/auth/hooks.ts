export const handleErrors = (error:any) => {
  return Object.values(error).join(',').split(',')[0];
}
