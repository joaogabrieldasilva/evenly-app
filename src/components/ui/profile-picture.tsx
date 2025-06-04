import { cn } from "@/src/utils/cn";
import { Text, View, ViewProps } from "react-native";
import { useImage, Image, ImageBackground } from "expo-image";

const sizes = {
  xs: "size-7",
  sm: "size-8",
  md: "size-10",
  lg: "size-12",
};

type ProfilePictureProps = {
  uri: string;
  userName: string;
  size?: keyof typeof sizes;
} & ViewProps;

export function ProfilePicture({
  uri,
  userName,
  className,
  size = "md",
  ...props
}: ProfilePictureProps) {
  const image = useImage(uri, {
    onError: () => {},
  });

  return (
    <View
      className={cn(
        "bg-slate-300 rounded-full border border-white items-center justify-center",
        sizes[size] || sizes.md,
        className
      )}
      {...props}
    >
      {uri && image ? (
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 100,
          }}
          source={image}
        />
      ) : (
        <Text className="font-bold text-gray-700">{userName?.slice(0, 1)}</Text>
      )}
    </View>
  );
}
