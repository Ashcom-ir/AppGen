// components/WebsiteOptionsClient.jsx
"use client";

import { useReducer } from "react";
import { Plus, Globe, Cloud, Server, Cpu, ShoppingCart, Search, CheckSquare } from "lucide-react";
import SectionSwitch from "./SectionSwitch";
import ChildOptions from "./ChildOptions";
import KeywordInput from "./KeywordInput";

/**
 * state structure:
 * {
 *   domainIr: false,
 *   domainCom: false,
 *   hosting: { enabled: false, selected: [] },
 *   vps: { enabled: false, selected: [] },
 *   website: { enabled: false, selected: [] },
 *   shop: { enabled: false, selected: [] },
 *   seo: { enabled: false, ads: [], keywords: [] }
 * }
 */

const initialState = {
  domainIr: false,
  domainCom: false,
  hosting: { enabled: false, choices: [] },
  vps: { enabled: false, choices: [] },
  website: { enabled: false, choices: [] },
  shop: { enabled: false, choices: [] },
  seo: { enabled: false, ads: [], keywords: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      return { ...state, [action.key]: action.value };
    case "toggleGroupEnable":
      return { ...state, [action.key]: { ...state[action.key], enabled: action.value } };
    case "setGroupChoices":
      return { ...state, [action.key]: { ...state[action.key], choices: action.choices } };
    case "setSeoAds":
      return { ...state, seo: { ...state.seo, ads: action.ads } };
    case "setSeoKeywords":
      return { ...state, seo: { ...state.seo, keywords: action.keywords } };
    default:
      return state;
  }
}

export default function WebsiteOptionsClient() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // helper to toggle simple booleans
  const toggle = (key, value) => dispatch({ type: "toggle", key, value });

  return (
    <div className="space-y-6">
      <header className="mb-4">
        <h1 className="text-3xl md:text-4xl font-extrabold">پیکربندی سفارش — وب‌سایت</h1>
        <p className="text-gray-300">هر گزینه را روشن کنید تا زیرمجموعه‌ها نمایش داده شوند. سپس انتخاب‌ها را ذخیره/پیش‌نمایش کنید.</p>
      </header>

      {/* دامنه .ir */}
      <SectionSwitch
        label="دامنه .ir"
        icon={<Globe />}
        checked={state.domainIr}
        onChange={(v) => toggle("domainIr", v)}
      >
        <ChildOptions
          items={["ثبت دامنه .ir", "انتقال داممه .ir"]}
          onChange={(choices) => dispatch({ type: "setGroupChoices", key: "domainIr", choices })}
        />
      </SectionSwitch>

      {/* دامنه .com */}
      <SectionSwitch
        label="دامنه .com"
        icon={<Globe />}
        checked={state.domainCom}
        onChange={(v) => toggle("domainCom", v)}
      >
        <ChildOptions
          items={["ثبت دامنه .com", "انتقال دامنه .com"]}
          onChange={(choices) => dispatch({ type: "setGroupChoices", key: "domainCom", choices })}
        />
      </SectionSwitch>

      {/* هاست */}
      <SectionSwitch
        label="هاست"
        icon={<Cloud />}
        checked={state.hosting.enabled}
        onChange={(v) => dispatch({ type: "toggleGroupEnable", key: "hosting", value: v })}
      >
        <ChildOptions
          items={["هاست 100 مگابایت", "هاست 200 مگابایت", "هاست 500 مگابایت", "هاست 1 گیگابایت"]}
          onChange={(choices) => dispatch({ type: "setGroupChoices", key: "hosting", choices })}
        />
      </SectionSwitch>

      {/* سرور مجازی */}
      <SectionSwitch
        label="سرور مجازی"
        icon={<Server />}
        checked={state.vps.enabled}
        onChange={(v) => dispatch({ type: "toggleGroupEnable", key: "vps", value: v })}
      >
        <ChildOptions
          items={["1 vCPU", "2 vCPU", "4 vCPU", "8 vCPU", "8GB RAM", "16GB RAM"]}
          onChange={(choices) => dispatch({ type: "setGroupChoices", key: "vps", choices })}
        />
      </SectionSwitch>

      {/* وب‌سایت */}
      <SectionSwitch
        label="وب‌سایت"
        icon={<CheckSquare />}
        checked={state.website.enabled}
        onChange={(v) => dispatch({ type: "toggleGroupEnable", key: "website", value: v })}
      >
        <div className="space-y-4">
          <ChildOptions
            title="تولید از پایه (استاتیک)"
            items={["HTML/CSS/JS", "بدون دیتابیس"]}
            onChange={(choices) => dispatch({ type: "setGroupChoices", key: "website", choices })}
          />
          <ChildOptions
            title="تولید از پایه (داینامیک)"
            items={["Node/PHP", "MySQL/Postgres"]}
            onChange={(choices) => dispatch({ type: "setGroupChoices", key: "website", choices })}
          />
          <div>
            <h4 className="font-semibold mb-2">وردپرس</h4>
            <ChildOptions
              items={["نصب وردپرس", "قالب پایه", "افزونه: فروشگاه", "افزونه: فرم تماس", "افزونه: سئو (Yoast)"]}
              onChange={(choices) => {
                // merge or store under website as needed
                dispatch({ type: "setGroupChoices", key: "website", choices: [...(state.website.choices || []), ...choices] });
              }}
            />
          </div>
        </div>
      </SectionSwitch>

      {/* فروشگاه آنلاین */}
      <SectionSwitch
        label="فروشگاه آنلاین"
        icon={<ShoppingCart />}
        checked={state.shop.enabled}
        onChange={(v) => dispatch({ type: "toggleGroupEnable", key: "shop", value: v })}
      >
        <div className="space-y-4">
          <ChildOptions
            title="تولید از پایه (داینامیک)"
            items={["پنل مدیریت", "درگاه پرداخت", "سبد خرید"]}
            onChange={(choices) => dispatch({ type: "setGroupChoices", key: "shop", choices })}
          />
          <div>
            <h4 className="font-semibold mb-2">وردپرس (ووکامرس)</h4>
            <ChildOptions
              items={["نصب ووکامرس", "افزونه پرداخت", "افزونه ارسال"]}
              onChange={(choices) => dispatch({ type: "setGroupChoices", key: "shop", choices })}
            />
          </div>
        </div>
      </SectionSwitch>

      {/* سئو */}
      <SectionSwitch
        label="سئو"
        icon={<Search />}
        checked={state.seo.enabled}
        onChange={(v) => dispatch({ type: "toggleGroupEnable", key: "seo", value: v })}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">خرید گوگل ادز</h4>
            <ChildOptions
              items={["پلن 10 دلاری", "پلن 20 دلاری", "پلن 50 دلاری"]}
              onChange={(choices) => dispatch({ type: "setSeoAds", ads: choices })}
            />
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <h4 className="font-semibold mb-2">کلمات کلیدی</h4>
            <p className="text-sm text-gray-300 mb-2">کلمات کلیدی را اضافه کنید؛ رنگ کادر براساس تخمین سختی کلمه تغییر می‌کند.</p>
            <KeywordInput
              value={state.seo.keywords}
              onChange={(keywords) => dispatch({ type: "setSeoKeywords", keywords })}
            />
          </div>
        </div>
      </SectionSwitch>

      {/* preview / actions */}
      <div className="pt-4 flex flex-col md:flex-row items-start md:items-center gap-3 justify-between">
        <pre className="bg-black/30 p-4 rounded-md w-full md:w-2/3 text-xs overflow-auto">
          {JSON.stringify(state, null, 2)}
        </pre>

        <div className="flex flex-col gap-2 w-full md:w-1/3">
          <button
            onClick={() => console.log("Submit (example) ->", state)}
            className="w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
          >
            ارسال سفارش (نمونه)
          </button>
          <button
            onClick={() => alert("پیش‌نمایش در کنسول")}
            className="w-full px-4 py-3 rounded-lg border border-white/10"
          >
            پیش‌نمایش JSON
          </button>
        </div>
      </div>
    </div>
  );
}
