package com.strangehill.cellar_lan_patcher;

import java.io.*;
import java.lang.management.ManagementFactory;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

/**
 * ВЕЛИКИЙ ПАТЧЕР О НАШ ВЕЛИКИЙ ИНЪЕКЦИЯ ОНЛАЙН ВИРУСА В НИСШИЙ УПАДОК АМЕРИКАН ВОРЛДЛАУНЧЕР КАВО ПАРТИЯ ЗАБИРАТЬ МИСКА РИС И КОШКА ЖЕНА ОТДАВАТЬ ВЕЛИКИЙ ST
 */

public class ModFolderPatcher {

    private static final String JAR_MAPPET_DIR = "assets/worldlauncher/minecraftfiles/saves/chapter1/mappet/";
    private static final String JAR_TARGET_SCRIPTS = JAR_MAPPET_DIR + "scripts/";
    private static final String JAR_TARGET_SETTINGS = JAR_MAPPET_DIR + "settings.json";

    private static final String SAVES_MAPPET_DIR = "saves/chapter1/mappet/";
    private static final String MY_SCRIPTS_RES = "/assets/cellar_lan_patcher/new_scripts/";
    private static final String MENU_MOD_RES = "/assets/cellar_lan_patcher/menufix/menufix-1.0.jar";
    private static final String CELLAR_MOD_RES = "/assets/cellar_lan_patcher/cellar/cellar.jar";

    private static final String JAR_CONFIG_DICK = "assets/worldlauncher/minecraftfiles/config/worldlauncher/";
    private static final String EXTERNAL_CONFIG_DICK = "config" + File.separator + "worldlauncher" + File.separator;
    private static final String CONFIG_RES_BASE = "/assets/cellar_lan_patcher/config/";

    private static final String[] ALL_FILES = {
            // все файлы, подготовленные к инъектированию
            "settings.json",
            "scripts/itworked.js",
            "scripts/playerTick.js",
            "scripts/playerTick.js.json",
            "scripts/AI/bon.js",
            "scripts/AI/bon.js.json",
            "scripts/AI/itCumming.js", // неудачная шутка от разработчика карты
            "scripts/AI/itCumming.js.json",
            "scripts/game/ambience.js",
            "scripts/game/ambience.js.json",
            "scripts/game/close.js",
            "scripts/game/close.js.json",
            "scripts/game/open.js",
            "scripts/game/open.js.json",
            "scripts/game/cutscenes/arms_infected.js",
            "scripts/game/cutscenes/arms_infected.js.json",
            "scripts/game/cutscenes/death_back.js",
            "scripts/game/cutscenes/death_back.js.json",
            "scripts/game/cutscenes/death_front.js",
            "scripts/game/cutscenes/death_front.js.json",
            "scripts/game/cutscenes/end.js",
            "scripts/game/cutscenes/end.js.json",
            "scripts/game/cutscenes/getup.js",
            "scripts/game/cutscenes/getup.js.json",
            "scripts/game/cutscenes/last_door.js",
            "scripts/game/cutscenes/last_door.js.json",
            "scripts/game/spawns/doors.js",
            "scripts/game/spawns/doors.js.json",
            "scripts/game/spawns/fuseRand.js",
            "scripts/game/spawns/fuseRand.js.json",
            "scripts/player/controls.js",
            "scripts/player/controls.js.json",
            "scripts/player/movement.js",
            "scripts/player/movement.js.json",
            "scripts/player/ost_breath.js",
            "scripts/player/ost_breath.js.json",
            "scripts/player/raycast.js",
            "scripts/player/raycast.js.json",
            "scripts/player/ui/credits.js",
            "scripts/player/ui/credits.js.json",
            "scripts/player/ui/death_screen.js",
            "scripts/player/ui/death_screen.js.json",
            "scripts/player/ui/tutorial.js",
            "scripts/player/ui/tutorial.js.json"
    };

    public static void patchWorldLauncher() {
        File debugLog = new File("cellar_lan_patcher_debug.log");
        PrintWriter logWriter = null;

        try {
            logWriter = new PrintWriter(new FileWriter(debugLog, true));
            logWriter.println(">>> ЗАПУСК ПАТЧЕРА (ИНЪЕКТОРА) <<<");

            String userDir = System.getProperty("user.dir");
            File minecraftDir = new File(userDir).getAbsoluteFile();
            File modsDir = new File(minecraftDir, "mods");

            File markerFile = new File(minecraftDir, "config/worldlauncher_patched.cfg");
            logWriter.println("Путь к игре: " + minecraftDir.getAbsolutePath());
            logWriter.println("Путь к mods: " + modsDir.getAbsolutePath());
            logWriter.println("Проверка маркера: " + markerFile.exists());

            if (markerFile.exists()) {
                logWriter.println("Выход: Маркер обнаружен, патч уже применен.");
                logWriter.flush();
                return;
            }

            File targetJar = new File(modsDir, "worldlauncher.jar");
            File tempJar = new File(System.getProperty("java.io.tmpdir"), "worldlauncher_patched.jar.tmp");

            /*
             * ИНЪЕКТИРОВАНИЕ В WORLDLAUNCHER.JAR
             */
            if (targetJar.exists()) {
                logWriter.println("Инъектирование worldlauncher.jar по пути: " + targetJar.getAbsolutePath());

                List<String> pathsToExclude = new ArrayList<>();

                pathsToExclude.add(JAR_TARGET_SETTINGS);
                pathsToExclude.add("assets/worldlauncher/minecraftfiles/saves/chapter1/mappet/scripts/");

                // конфиги WorldLauncher
                pathsToExclude.add(JAR_CONFIG_DICK + "worldlauncher/config.json");
                pathsToExclude.add(JAR_CONFIG_DICK + "worldlauncher/logo.png");
                // если в JAR могут быть другие конфиги - добавляем папку целиком (на будущее)
                pathsToExclude.add(JAR_CONFIG_DICK);

                try (ZipInputStream zis = new ZipInputStream(new FileInputStream(targetJar));
                     ZipOutputStream zos = new ZipOutputStream(new FileOutputStream(tempJar))) {

                    ZipEntry entry;
                    while ((entry = zis.getNextEntry()) != null) {
                        String name = entry.getName();

                        // проверяем, нужно ли исключить этот файл
                        boolean shouldExclude = false;
                        for (String excludePath : pathsToExclude) {
                            // если excludePath заканчивается на "/" - исключаем всю папку
                            if (excludePath.endsWith("/")) {
                                if (name.startsWith(excludePath)) {
                                    shouldExclude = true;
                                    break;
                                }
                            } else {
                                // иначе сравниваем точное совпадение
                                if (name.equals(excludePath)) {
                                    shouldExclude = true;
                                    break;
                                }
                            }
                        }

                        if (shouldExclude) {
                            logWriter.println("--- Исключён старый файл: " + name);
                            zis.closeEntry();
                            continue;
                        }

                        // копируем все остальные файлы
                        zos.putNextEntry(new ZipEntry(name));
                        copyStream(zis, zos);
                        zos.closeEntry();
                        zis.closeEntry();
                    }

                    // добавляем новые скрипты Mappet
                    for (String relativeFilePath : ALL_FILES) {
                        String fullResourcePath = MY_SCRIPTS_RES + relativeFilePath;
                        try (InputStream is = ModFolderPatcher.class.getResourceAsStream(fullResourcePath)) {
                            if (is != null) {
                                String destinationInJar = JAR_MAPPET_DIR + relativeFilePath;
                                zos.putNextEntry(new ZipEntry(destinationInJar));
                                copyStream(is, zos);
                                zos.closeEntry();
                                logWriter.println("+++ Добавлен скрипт: " + destinationInJar);
                            }
                        }
                    }

                    // конфиги
                    patchConfigsFromResources(zos, logWriter);

                }

                // перезаписываем оригинальный JAR
                try (FileInputStream fis = new FileInputStream(tempJar);
                     FileOutputStream fos = new FileOutputStream(targetJar)) {
                    copyStream(fis, fos);
                }
                tempJar.delete();

                // внешние конфиги
                patchExternalConfigs(minecraftDir, logWriter);

                logWriter.println("=== worldlauncher.jar успешно переработан.");
            } else {
                logWriter.println("!!! ПРЕДУПРЕЖДЕНИЕ: worldlauncher.jar не найден в папке mods!");
            }


            /*
             * МОДИФИКАЦИЯ ПАПКИ SAVES
             */
            File targetMappetSaves = new File(minecraftDir, SAVES_MAPPET_DIR);
            if (!targetMappetSaves.exists()) {
                targetMappetSaves.mkdirs();
            }

            File oldSettings = new File(targetMappetSaves, "settings.json");
            if (oldSettings.exists()) { oldSettings.delete(); }
            File oldScriptsDir = new File(targetMappetSaves, "scripts");
            if (oldScriptsDir.exists()) { clearDirectory(oldScriptsDir); }

            for (String relativeFilePath : ALL_FILES) {
                String fullResourcePath = MY_SCRIPTS_RES + relativeFilePath;
                try (InputStream is = ModFolderPatcher.class.getResourceAsStream(fullResourcePath)) {
                    if (is != null) {
                        File outputFile = new File(targetMappetSaves, relativeFilePath);
                        outputFile.getParentFile().mkdirs();

                        try (FileOutputStream fos = new FileOutputStream(outputFile)) {
                            copyStream(is, fos);
                        }
                        logWriter.println("+++ Файл успешно записан в сохранения: " + outputFile.getName());
                    }
                }
            }

            /*
            * ИЗВЛЕЧЕНИЕ ВЕЛИКОГО LAN-ФИКСА ОТ FL1Z'А
            */

            File destinationMenuJar = new File(modsDir, "menufix-1.0.jar");
            logWriter.println("... Извлечение LAN-фикса в: " + destinationMenuJar.getAbsolutePath());

            try (InputStream LANStream = ModFolderPatcher.class.getResourceAsStream(MENU_MOD_RES)) {
                if (LANStream != null) {
                    try (FileOutputStream fos = new FileOutputStream(destinationMenuJar)) {
                        copyStream(LANStream, fos);
                    }
                    logWriter.println("+++ menufix-1.0.jar успешно скопирован в папку mods.");
                } else {
                    logWriter.println("--- КРИТИЧЕСКАЯ ОШИБКА: menufix-1.0.jar не найден в ресурсах по пути: " + MENU_MOD_RES);
                }
            }

            /*
             * ИЗВЛЕЧЕНИЕ АМЕРИКАН БУРГЕР CELLAR МОДА
             */

            File destinationCellarJar = new File(modsDir, "cellar.jar");
            logWriter.println("... Извлечение cellar.jar в: " + destinationCellarJar.getAbsolutePath());

            try (InputStream cellarStream = ModFolderPatcher.class.getResourceAsStream(CELLAR_MOD_RES)) {
                if (cellarStream != null) {
                    try (FileOutputStream fos = new FileOutputStream(destinationCellarJar)) {
                        copyStream(cellarStream, fos);
                    }
                    logWriter.println("+++ cellar.jar успешно скопирован в папку mods.");
                } else {
                    logWriter.println("--- КРИТИЧЕСКАЯ ОШИБКА: cellar.jar не найден в ресурсах по пути: " + CELLAR_MOD_RES);
                }
            }

            // создаем маркер завершения (Neiron111 так никогда не делал)
            markerFile.getParentFile().mkdirs();
            markerFile.createNewFile();

            logWriter.println("Все этапы патча завершены успешно. Перезапуск...");
            logWriter.flush();
            logWriter.close();

            restartGame();

        } catch (Exception e) {
            if (logWriter != null) {
                logWriter.println("--- КРИТИЧЕСКИЙ СБОЙ:");
                e.printStackTrace(logWriter);
                logWriter.flush();
            }
        } finally {
            if (logWriter != null) {
                logWriter.close();
            }
        }
    }

    /*
     * Инъектирование всех файлов из ресурсной папки config в JAR
     */
    private static void patchConfigsFromResources(ZipOutputStream zos, PrintWriter logWriter) {
        String resourceBase = "/assets/cellar_lan_patcher/config/";

        String[] configFiles = {
                "config.json",
                "logo.png"
        };

        for (String fileName : configFiles) {
            String resourcePath = resourceBase + fileName;
            try (InputStream is = ModFolderPatcher.class.getResourceAsStream(resourcePath)) {
                if (is != null) {
                    String destPath = JAR_CONFIG_DICK + fileName;
                    ZipEntry entry = new ZipEntry(destPath);
                    zos.putNextEntry(entry);

                    byte[] buffer = new byte[8192];
                    int read;
                    while ((read = is.read(buffer)) != -1) {
                        zos.write(buffer, 0, read);
                    }

                    zos.closeEntry();
                    logWriter.println("+++ Инъектирован конфиг в JAR: " + destPath);
                } else {
                    logWriter.println("--- Ресурс не найден: " + resourcePath);
                }
            } catch (IOException e) {
                logWriter.println("--- ОШИБКА при инъекции конфига " + fileName + ": " + e.getMessage());
            }
        }
    }

    /*
     * Копирование файлов из ресурсов в папку config/worldlauncher/
     */
    private static void patchExternalConfigs(File minecraftDir, PrintWriter logWriter) {
        File configDir = new File(minecraftDir, EXTERNAL_CONFIG_DICK);
        if (!configDir.exists()) {
            configDir.mkdirs();
            logWriter.println("+++ Создана папка: " + configDir.getAbsolutePath());
        }

        String resourceBase = "/assets/cellar_lan_patcher/config/";
        String[] configFiles = {
                "config.json",
                "logo.png"
        };

        for (String fileName : configFiles) {
            String resourcePath = resourceBase + fileName;
            try (InputStream is = ModFolderPatcher.class.getResourceAsStream(resourcePath)) {
                if (is != null) {
                    File outputFile = new File(configDir, fileName);
                    try (FileOutputStream fos = new FileOutputStream(outputFile)) {
                        copyStream(is, fos);
                    }
                    logWriter.println("+++ Конфиг записан в config: " + outputFile.getAbsolutePath());
                } else {
                    logWriter.println("!!! ПРЕДУПРЕЖДЕНИЕ: Ресурс не найден: " + resourcePath);
                }
            } catch (IOException e) {
                logWriter.println("--- ОШИБКА при записи конфига " + fileName + ": " + e.getMessage());
            }
        }
    }

    private static void copyStream(InputStream in, OutputStream out) throws IOException {
        byte[] buffer = new byte[8192];
        int read;
        while ((read = in.read(buffer)) != -1) {
            out.write(buffer, 0, read);
        }
    }

    private static void clearDirectory(File directory) {
        File[] allContents = directory.listFiles();
        if (allContents != null) {
            for (File file : allContents) {
                clearDirectory(file);
            }
        }
        directory.delete();
    }

    private static void restartGame() throws IOException {
        String javaBin = System.getProperty("java.home") + File.separator + "bin" + File.separator + "java";
        List<String> vmArgs = ManagementFactory.getRuntimeMXBean().getInputArguments();
        List<String> cmd = new ArrayList<>();
        cmd.add(javaBin);
        cmd.addAll(vmArgs);
        cmd.add("-cp");
        cmd.add(System.getProperty("java.class.path"));
        cmd.add(System.getProperty("sun.java.command"));

        ProcessBuilder pb = new ProcessBuilder(cmd);
        pb.inheritIO();
        pb.start();

        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }

        System.exit(0);
    }
}
