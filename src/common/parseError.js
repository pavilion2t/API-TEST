import Res from './Res';

export default async function parseError(request, response) {
  const error = {
    request,
  };
  error.response = await Res.parse(response);
  error.message = error.response.data.message;
  return error;
}
