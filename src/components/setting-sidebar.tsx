"use client";
import React from "react";
import { useStore } from "@/hooks/use-store";
import { useSidebar } from "@/hooks/use-sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const SettingSidebar = () => {
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { settings, setSettings } = sidebar;
  return (
    <TooltipProvider>
      <div className='mr-4 flex gap-6'>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='flex items-center space-x-2'>
              <Switch
                id='is-hover-open'
                onCheckedChange={(x) => setSettings({ isHoverOpen: x })}
                checked={settings.isHoverOpen}
              />
              <Label htmlFor='is-hover-open'>Hover</Label>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>When hovering on the sidebar in mini state, it will open</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className='flex items-center space-x-2'>
              <Switch
                id='disable-sidebar'
                onCheckedChange={(x) => setSettings({ disabled: x })}
                checked={settings.disabled}
              />
              <Label htmlFor='disable-sidebar'>Sidebar</Label>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Hide sidebar</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default SettingSidebar;
