package com.strangehill.cellar_lan_patcher;

import net.minecraftforge.fml.relauncher.IFMLLoadingPlugin;
import java.util.Map;

@IFMLLoadingPlugin.Name("CellarLANFixPatcherCore")
@IFMLLoadingPlugin.MCVersion("1.12.2")
public class CellarLANFixPatcherCore implements IFMLLoadingPlugin {

    public CellarLANFixPatcherCore() {
        // вызов в конструкторе для максимально раннего перехвата управления (CoreMod)
        System.out.println("[CellarLANFix] Запуск раннего патчинга из конструктора Coremod...");
        ModFolderPatcher.patchWorldLauncher();
    }

    @Override
    public String[] getASMTransformerClass() {
        return null;
    }

    @Override
    public String getModContainerClass() {
        return null;
    }

    @Override
    public String getSetupClass() {
        return null;
    }

    @Override
    public void injectData(Map<String, Object> data) {
    }

    @Override
    public String getAccessTransformerClass() {
        return null;
    }
}