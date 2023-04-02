import { HxModal } from "@/components/base/modal";
import { HxButton } from "@/components/base/button";
import { HxIcon } from "@/components/base/icon";
import { HxOverlay } from "@/components/base/overlay";
import { HxInput } from "@/components/base/input";
import { HxFormGroup } from "@/components/base/form-group";
import { HxOtp } from "@/components/base/otp";
import { HxBadge } from "@/components/base/badge";
import { HxTextarea } from "@/components/base/textarea";
import { HxRadio } from "@/components/base/radio";
import { HxCheckbox, HxCheckboxGroup } from "@/components/base/checkbox";
import { HxSwitch } from "@/components/base/switch";
import { HxCollapse, HxCollapseItem } from "@/components/base/collapse";
import { HxCollapseTransition } from "@/components/base/collapse-transition";
import { HxSlider } from "@/components/base/slider";
import { HxPagination } from "@/components/base/pagination";
import { HxAvatar } from "@/components/base/avatar";
import { HxUpload } from "@/components/base/upload";
// import { HxDropdown, HxDropdownMenu, HxDropdownItem } from "@/components/base/dropdown";
// import { HxConfigProvider } from "@/components/base/config-provider";
import { HxTabPane, HxTabs } from '@/components/base/tabs'
import { HxSelect } from '@/components/base/select'
import { HxSkeleton, HxSkeletonItem } from '@/components/base/skeleton'
import { HxPopover } from '@/components/base/popover'
import { HxPopper } from '@/components/base/popper'
import { HxTooltip } from '@/components/base/tooltip'
import type { Plugin } from 'vue'

export default [
  HxModal,
  HxButton,
  HxIcon,
  HxOverlay,
  HxInput,
  HxFormGroup,
  HxOtp,
  HxBadge,
  HxTextarea,
  HxRadio,
  HxSwitch,
  HxCollapse,
  HxCollapseItem,
  HxCollapseTransition,
  HxCheckbox,
  HxCheckboxGroup,
  HxSlider,
  HxPagination,
  HxAvatar,
  HxUpload,
  // HxDropdown,
  // HxDropdownMenu,
  // HxDropdownItem,
  HxTabPane,
  HxTabs,
  HxSelect,
  HxSkeleton,
  HxSkeletonItem,
  HxPopover,
  HxPopper,
  HxTooltip

] as Plugin[];
