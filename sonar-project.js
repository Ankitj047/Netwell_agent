const sonarqubeScanner = require("sonarqube-scanner");
sonarqubeScanner(
    {
        serverUrl: "https://dev.maricopaafa.universalhealthfellowship.org:9000/sonar/",
        token: "bd3674a51c1393585abda0e35b3d928d1d9438be",
        options: {
            "sonar.sources": "./src",
            "sonar.exclusions": "**/__tests__/**",
            "sonar.tests": "./src/__tests__",
            "sonar.test.inclusions": "./src/__tests__/**/*.test.tsx,./src/__tests__/**/*.test.ts",
            "sonar.typescript.lcov.reportPaths": "coverage/lcov.info",
            "sonar.testExecutionReportPaths": "reports/test-report.xml",
        },
    },
    () => { },
);

//memberportalFE