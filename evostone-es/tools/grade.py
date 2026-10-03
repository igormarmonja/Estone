import numpy as np
from PIL import Image
def grade(im, wb=0.6):
    a = np.asarray(im.convert('RGB')).astype(np.float32) / 255.0
    # 1) часткова нейтралізація балансу білого (gray-world), щоб холодні й жовті кадри зійшлися
    mean = a.reshape(-1, 3).mean(0); g = mean.mean()
    a = a * (1 + wb * (g / np.maximum(mean, 1e-3) - 1))
    # 2) теплий тон бренду: трохи червоного, менше синього
    a = a * np.array([1.045, 1.0, 0.90])
    # 3) м'яка крива: підняті тіні, приглушені світла (матовий вигляд)
    a = np.clip(a, 0, 1)
    a = 0.035 + a * 0.94
    a = a ** 0.97
    # 4) трохи знизити насиченість
    l = (a * [0.299, 0.587, 0.114]).sum(2, keepdims=True)
    a = l + (a - l) * 0.88
    # 5) легкий тонувальний шар у тіні (коричневий бренду)
    shadow = (1 - l) ** 2
    a = a + shadow * np.array([0.035, 0.012, -0.02])
    return Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8))
