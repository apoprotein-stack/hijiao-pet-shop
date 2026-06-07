import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { getAllProducts, getProductsByCategory, getProductById, createContactSubmission, createOrder, getOrderById } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // 商品相關 API
  products: router({
    // 取得所有商品
    list: publicProcedure.query(async () => {
      return await getAllProducts();
    }),
    // 根據分類取得商品
    byCategory: publicProcedure
      .input(z.object({ category: z.enum(["cat", "dog", "treats"]) }))
      .query(async ({ input }) => {
        return await getProductsByCategory(input.category);
      }),
    // 取得單一商品詳情
    detail: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getProductById(input.id);
      }),
  }),

  // 聯絡表單 API
  contact: router({
    // 提交聯絡表單
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "請輸入姓名"),
        phone: z.string().min(1, "請輸入電話"),
        email: z.string().email("請輸入有效的電子郵件"),
        message: z.string().min(1, "請輸入留言內容"),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await createContactSubmission(input);
          return { success: true, message: "感謝您的聯絡，我們會盡快回覆！" };
        } catch (error) {
          console.error("Error submitting contact form:", error);
          throw new Error("提交聯絡表單時發生錯誤");
        }
      }),
  }),

  // 訂單相關 API
  orders: router({
    // 建立訂單
    create: publicProcedure
      .input(z.object({
        userId: z.number(),
        orderNumber: z.string(),
        totalAmount: z.string(),
        customerName: z.string(),
        customerEmail: z.string().email(),
        customerPhone: z.string(),
        shippingAddress: z.string(),
        status: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await createOrder(input);
          return { success: true, message: "訂單建立成功！" };
        } catch (error) {
          console.error("Error creating order:", error);
          throw new Error("建立訂單時發生錯誤");
        }
      }),
    // 取得訂單詳細
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await getOrderById(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
