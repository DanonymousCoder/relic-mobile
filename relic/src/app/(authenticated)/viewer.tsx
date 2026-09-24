import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { getShootDetails, getTimeline } from "../../services/api";

interface FileDetail {
  FileID: string;
  Filename: string;
  OriginalSize: number;
  StoredSize: number;
  Codec: string;
  Hash: string;
  Archived: boolean;
}

interface ShootDetails {
  id: string;
  name: string;
  files: FileDetail[];
  original_bytes: number;
  stored_bytes: number;
  compression_pct: number;
}

interface TimelineItem {
  ID: string;
  Filename: string;
  TakenAt: { Time: string; Valid: boolean } | null;
  CameraMake: string;
  CameraModel: string;
  Lens: string;
  Aperture: string;
  Shutter: string;
  ISO: { Int64: number; Valid: boolean } | null;
}

export default function ImageViewerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [shoot, setShoot] = useState<ShootDetails | null>(null);
  const [timeline, setTimeline] = useState<TimelineItem[]>([]);

  const formatBytes = (bytes?: number) => {
    if (!bytes) return "0 MB";

    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return "Unknown date";
    const date = new Date(isoString);

    return date.toLocaleDateString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        const [detailsRes, timelineRes] = await Promise.all([
          getShootDetails(id),
          getTimeline(id),
        ]);
        setShoot(detailsRes as ShootDetails);
        setTimeline((timelineRes as TimelineItem[]) || []);
      } catch (err) {
        console.error("Failed to load Viewer data", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  const activeFile = shoot?.files?.[0];
  const activeMeta =
    timeline?.find((t) => t.Filename === activeFile?.Filename) || timeline?.[0];

  const savedBytes =
    (activeFile?.OriginalSize || 0) - (activeFile?.StoredSize || 0);
  const savedPct = activeFile?.OriginalSize
    ? Math.round((savedBytes / activeFile.OriginalSize) * 100)
    : shoot?.compression_pct || 0;

  return (
    <SafeAreaView className="flex-1 bg-[#0A0A0A]" edges={["top"]}>
      {/** navigation section */}
      <View className="flex-row justify-between items-center px-4 py-2 z-10">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 border border-gray-800 items-center justify-center"
        >
          <Feather name="arrow-left" size={20} color="white" />
        </TouchableOpacity>

        <TouchableOpacity className="w-10 h-10 border border-gray-800 items-center justify-center rounded-full">
          <Feather name="info" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {/** Main section */}
      <View className="flex-1 justify-center items-center px-4">
        <View className="border border-gray-800 p-4 w-full">
          <Image
            source={require("../../../assets/img-preview.png")}
            className="w-full h-72"
            resizeMode="contain"
          />
        </View>
      </View>

      {/** Image Details  */}
      <View className="flex-1 bg-[#1111] border-t border-gray-800 max-h-[50%]">
        <View className="flex-row justify-between items-center p-4 border-b border-gray-800">
          <View>
            <Text className="text-gray-300 font-serif text-sm">
              {activeFile?.Filename || "No File"}
            </Text>
            <Text className="text-gray-500 text-xs mt-1">
              Captured:{" "}
              {activeMeta?.TakenAt?.Valid
                ? formatDate(activeMeta.TakenAt.Time)
                : "Unknown date"}
            </Text>
          </View>

          <TouchableOpacity className="border border-gray-700 px-4 py-2 flex-row items-center">
            <Feather
              name="rotate-ccw"
              size={12}
              color="#c69c6d"
              style={{ marginRight: 8 }}
            />
            <Text className="text-[#c69c6d] text-xs tracking-widest font-mono font-bold uppercase">
              Restore
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="px-4 pt-4" showsVerticalScrollIndicator={false}>
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-serif">Metadata</Text>
            <TouchableOpacity>
              <Feather name="x" size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/** Identifier section */}
          <Text className="text-gray-500 text-[10px] tracking-widest font-mono uppercase mb-2">
            Identifier
          </Text>
          <View className="border-t border-gray-800 py-3 mb-4">
            <Text className="text-gray-300 text-md font-serif">
              {activeFile?.Filename || "No File"}
            </Text>
          </View>

          {/** EXIF data section */}
          <Text className="text-gray-500 text-[10px ] tracking-widest font-mono uppercase mb-2">
            EXIF Data
          </Text>
          <View className="border-t border-gray-800">
            <View className="flex-row justify-between py-3 border-b border-gray-800/50">
              <Text className="text-gray-400 text-xs">Camera</Text>
              <Text className="text-gray-300 text-md font-serif">
                {activeMeta?.CameraMake} {activeMeta?.CameraModel}
              </Text>
            </View>
            <View className="flex-row justify-between py-3 border-b border-gray-800/50">
              <Text className="text-gray-400 text-xs">Lens</Text>
              <Text className="text-gray-300 text-md font-serif">
                {activeMeta?.Lens || "Unavailable"}
              </Text>
            </View>
            <View className="flex-row justify-between py-3 mb-4">
              <Text className="text-gray-400 text-xs">Settings</Text>
              <Text className="text-gray-300 text-md">
                ISO {activeMeta?.ISO?.Valid ? activeMeta.ISO.Int64 : "N/A"},{" "}
                {activeMeta?.Aperture}, {activeMeta?.Shutter}
              </Text>
            </View>
          </View>

          {/** Archive metrics section */}
          <Text className="uppercase text-gray-500 text-[10px] tracking-widest font-mono my-2">
            Archive metrics
          </Text>
          <View className="border-t border-gray-800">
            <View className="flex-row justify-between py-3 border-b border-gray-800/50">
              <Text className="text-gray-400 text-xs">Original size</Text>
              <Text className="text-gray-300 text-md font-serif">
                {formatBytes(activeFile?.OriginalSize)}
              </Text>
            </View>
            <View className="flex-row justify-between py-3 border-b border-gray-800/50">
              <Text className="text-gray-400 text-xs">Archived size</Text>
              <Text className="text-gray-300 text-md font-serif">
                {formatBytes(activeFile?.StoredSize)}
              </Text>
            </View>
            <View className="flex-row justify-between py-3 mb-4">
              <Text className="text-gray-400 text-xs">Storage saved</Text>
              <Text className="text-gray-300 text-md font-serif">
                {formatBytes(savedBytes)} ({savedPct}%)
              </Text>
            </View>
          </View>

          {/** Integrity section */}
          <Text className="text-gray-500 text-[10px] tracking-widest font-mono uppercase mb-2 mt-2">
            Integrity (SHA-256)
          </Text>
          <View className="border-t border-gray-800 py-3 mb-10">
            <Text className="text-gray-400 text-md font-mono leading-4">
              {activeFile?.Hash || "Pending"}
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
