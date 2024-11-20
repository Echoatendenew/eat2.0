import AppError from "../../errors/AppError";
import QuickMessage from "../../models/QuickMessage";

interface Data {
  shortcode: string;
  message: string;
  userId: number | string;
  id?: number | string;
  isCategory?: boolean;
  categoryId?: number | string;
}

const UpdateService = async (data: Data): Promise<QuickMessage> => {
  const { id, shortcode, message, userId, isCategory, categoryId } = data;

  const record = await QuickMessage.findByPk(id);

  if (!record) {
    throw new AppError("ERR_NO_TICKETNOTE_FOUND", 404);
  }

  await record.update({
    shortcode,
    message,
    userId,
    isCategory,
    categoryId: categoryId == '' ? null : categoryId
  });

  return record;
};

export default UpdateService;
