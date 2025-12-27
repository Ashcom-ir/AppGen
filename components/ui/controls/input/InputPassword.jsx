"use client";
import PasteToClipboardButton from '@/components/ui/controls/buttons/PasteToClipboardButton';
import CopyToClipboardButton from '@/components/ui/controls/buttons/CopyToClipboardButton';
import ClearInputValueButton from '@/components/ui/controls/buttons/ClearInputValueButton';
import ShowHidePasswordButton from '@/components/ui/controls/buttons/ShowHidePasswordButton';

export default function InputPassword({
      id = "txtid",
      name = 'txtname',
      dir = "ltr",
      onChange = () => { },
      onKeyDown,
      onKeyUp,
      onInput,
      maxLength = "",
      className = "",
      placeholder = "",
      showCopyBtn = false,
      showPasteBtn = false,
      showClearBtn = false,
      showPasswordShowHideBtn = false
}) {
      return (
            <div className="relative flex gap-3">
                  <input
                        dir={dir}
                        type='password'
                        id={id}
                        name={name}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        onChange={(e) => onChange(e)}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        onInput={onInput}
                        /* className={`${className} transition-all duration-500 ease-in-out ${filled || (id).split('_')[1] === "0" ? filledBorderColor : normalBorderColor
                              }`} */
                        className={`${className}caret-pink-300 text-center w-full rounded-lg shadow-xs border focus:border-pink-300 hover:bg-black/20 bg-transparent overflow-hidden transition-all duration-500 ease-in-out`}
                        autoComplete="off"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <PasteToClipboardButton show={showPasteBtn} elementById={id} />
                        <CopyToClipboardButton show={showCopyBtn} elementById={id} />
                        <ClearInputValueButton show={showClearBtn} elementById={id} />
                        <ShowHidePasswordButton show={showPasswordShowHideBtn} elementById={id} />
                  </div>
            </div>
      );
}
