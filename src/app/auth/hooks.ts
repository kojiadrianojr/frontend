export const useHandleErrors = (error:any) => {
  return Object.values(error).join(',').split(',')[0];
}