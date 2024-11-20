import * as Yup from "yup";
import AppError from "../../errors/AppError";
import QuickMessage from "../../models/QuickMessage";

interface Data {
  shortcode: string;
  message: string;
  companyId: number | string;
  userId: number | string;
  isCategory?: boolean;
  categoryId?: number | string | null;
}

const CreateService = async (data: Data): Promise<QuickMessage> => {
  const { shortcode, message, isCategory } = data;

  let ticketnoteSchema = null;

  // const ticketnoteSchema = Yup.object().shape({
  //   shortcode: Yup.string()
  //     .min(3, "ERR_QUICKMESSAGE_INVALID_NAME")
  //     .required("ERR_QUICKMESSAGE_REQUIRED"),
  //   message: Yup.string()
  //     .min(3, "ERR_QUICKMESSAGE_INVALID_NAME")
  //     .required("ERR_QUICKMESSAGE_REQUIRED")
  // });

  // try {
  //   await ticketnoteSchema.validate({ shortcode, message });
  // } catch (err: any) {
  //   throw new AppError(err.message);
  // }

  if (!isCategory) {
    ticketnoteSchema = Yup.object().shape({
      shortcode: Yup.string()
        .min(3, "ERR_QUICKMESSAGE_INVALID_NAME")
        .required("ERR_QUICKMESSAGE_REQUIRED"),
      message: Yup.string()
        .min(3, "ERR_QUICKMESSAGE_INVALID_NAME")
        .required("ERR_QUICKMESSAGE_REQUIRED")
    });
  } else {
    ticketnoteSchema = Yup.object().shape({
      shortcode: Yup.string()
        .min(3, "ERR_QUICKMESSAGE_INVALID_NAME")
        .required("ERR_QUICKMESSAGE_REQUIRED")
    });
  }

  try {
    await ticketnoteSchema.validate({ shortcode, message });
  } catch (err: any) {
    throw new AppError(err.message);
  }



  if (data.categoryId == '') {
    data.categoryId = null;
  }


  const record = await QuickMessage.create(data);

  return record;
};

export default CreateService;
