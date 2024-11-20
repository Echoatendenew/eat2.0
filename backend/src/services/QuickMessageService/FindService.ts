import { Op } from "sequelize";
import QuickMessage from "../../models/QuickMessage";
import Company from "../../models/Company";

type Params = {
  companyId: string;
  userId: string;
  showAll: string;
};

const FindService = async ({ companyId, userId, showAll }: Params): Promise<QuickMessage[]> => {
  const notes: QuickMessage[] = await QuickMessage.findAll({
    where: {
      companyId,
      // userId,
      ...(showAll === "true" ? {} : { isCategory: false })
    },
    include: [{ model: Company, as: "company", attributes: ["id", "name"] }],
    order: [["shortcode", "ASC"]]
  });

  return notes;
};

export default FindService;
