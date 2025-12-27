"use client";

import AnimatedBorder from "@/components/ui/AnimatedBorder";
import BgColorPickerMaster from "@/components/ui/bg-color-picker/BgColorPickerMaster";
import ContextMenu from "@/components/ui/controls/color-picker/ContextMenu";
export default function GenClientPage() {

      return (
            <main className="relative flex items-center justify-center bg-transparent min-h-screen overflow-hidden">
                  <div className={`w-full min-h-screen`}>
                        {/* <ContextMenu target="#divLightTheme" />
                        <ContextMenu target="#divDarkTheme" /> */}
                        <BgColorPickerMaster hue={20}
                              saturation={100}
                              lightness={92}
                              opacity={100} limitMin={50} limitMax={100} isDark={false} />
                        <BgColorPickerMaster hue={100}
                              saturation={100}
                              lightness={8}
                              opacity={100} limitMin={0} limitMax={50} isDark={true} />
                        {/*                         <div id="divDarkTheme" style={{ backgroundColor: bgColor }} className={`min-h-[50vh] w-full rounded-lg border border-amber-50/10`}>
                              <div className="flex justify-start items-center mb-3">
                                    <Moon size={40} />
                                    <span className={`text-white text-md font-semibold text-shadow-pink-200 text-shadow-[0_0_10px]`}>
                                          <Typewriter show={true} className={''} text={"پس زمینه برای تم روشن انتخاب کنید"} speed={70} hideAfterType={true} />
                                    </span>
                              </div>
                              <div className="flex justify-between items-center">
                                    <ColorPicker onChange={handleColorChange}></ColorPicker>
                              </div>
                              <ButtomNav className='bottom-1 left-1/2' />
                        </div> */}

                  </div>
            </main>
      );
}
