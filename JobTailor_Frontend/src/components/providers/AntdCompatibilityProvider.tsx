"use client";

import React, { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { unstableSetRender } from "antd/es/config-provider/UnstableContext";

type CompatibleContainer = Element | DocumentFragment;

const rootCache = new Map<CompatibleContainer, Root>();

export default function AntdCompatibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    unstableSetRender((node, container) => {
      const mountNode = container as CompatibleContainer;
      let root = rootCache.get(mountNode);

      if (!root) {
        root = createRoot(mountNode);
        rootCache.set(mountNode, root);
      }

      root.render(node);

      return async () => {
        await Promise.resolve();
        const mountedRoot = rootCache.get(mountNode);
        mountedRoot?.unmount();
        rootCache.delete(mountNode);
      };
    });
  }, []);

  return <>{children}</>;
}
