"use client";
import PasteToClipboardButton from '@/components/ui/controls/buttons/PasteToClipboardButton';
import CopyToClipboardButton from '@/components/ui/controls/buttons/CopyToClipboardButton';
import ClearInputValueButton from '@/components/ui/controls/buttons/ClearInputValueButton';


export default function InputTxet({ 
      id="txtid",
      name='txtname',
      dir="ltr",
      onChange = () => {},
      onKeyDown,
      onKeyUp,
      onInput,
      maxLength = "",
      className = "",
      placeholder = "",
      showCopyBtn=false,
      showPasteBtn=false,
      showClearBtn=false
}) {
      return (
            <div className="relative flex gap-3">
                  <input 
                        dir={dir}
                        type='text'
                        id={id}
                        name={name}
                        maxLength={maxLength}
                        placeholder={placeholder}
                        onChange={(e) => onChange(e)}
                        onKeyDown={onKeyDown}
                        onKeyUp={onKeyUp}
                        onInput={onInput}
                        className={className}
                        autoComplete="off"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <PasteToClipboardButton show={showPasteBtn} elementById={id} />
                        <CopyToClipboardButton show={showCopyBtn} elementById={id} />
                        <ClearInputValueButton show={showClearBtn} elementById={id} />
                        
                  </div>
            </div>
      );
}
